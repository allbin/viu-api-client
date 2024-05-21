import {
  ApiFeature,
  ApiFloor,
  ApiLocation,
  ApiService,
  ApiServiceTag,
  ApiUnit,
  ViuApiClient,
} from '../index';
import * as uuid from 'uuid';
import { AxiosError } from 'axios';

if (!process.env.TOKEN) {
  console.error(`usage: TOKEN=your_token_here npx ts-node ${__filename}`);
  process.exit(1);
}

const client = ViuApiClient({
  baseUrl: 'http://localhost:50000',
  token: process.env.TOKEN,
});

type Client = ReturnType<typeof ViuApiClient>;

const createAndUpdateLocation = async (
  client: Client,
): Promise<ApiLocation> => {
  const created_location = await client.locations.create({
    city: 'City',
    street: 'Street 1',
    zipcode: '12345',
    site_name: 'SiteName',
    config: {},
  });

  const { id, city, zipcode, site_name } = created_location;
  const updated_location = await client.locations.update(id, {
    city,
    zipcode,
    site_name,
    street: 'Street 2',
    config: {},
  });

  return updated_location;
};

const createAndUpdateFloor = async (
  client: Client,
  location_id: string,
): Promise<ApiFloor> => {
  const created_floor = await client.floors.create({
    location_id,
    level: -1,
  });

  const { id, level } = created_floor;

  const updated_floor = await client.floors.update(id, {
    level,
    floor_plan: 'https://example.com/floor_plan.png',
  });

  return updated_floor;
};

const createAndUpdateUnit = async (
  client: Client,
  floor_id: string,
): Promise<ApiUnit> => {
  const created_unit = await client.units.create({
    floor_id,
    object_id: '1234',
    label: 'Lägenhet 1234',
    tenants: [],
  });

  const { id, label } = created_unit;

  const updated_unit = await client.units.update(id, {
    object_id: '1100',
    label,
    tenants: [
      {
        id: uuid.v4(),
        first_name: 'John',
        last_name: 'Doe',
        extras: {
          type: 'individual',
        },
      },
    ],
  });

  return updated_unit;
};

const createAndUpdateServiceTag = async (
  client: Client,
): Promise<ApiServiceTag> => {
  const created_service_tag = await client.serviceTags.create({
    name: `TagName-${uuid.v4()}`,
  });

  const { id } = created_service_tag;

  const updated_service_tag = await client.serviceTags.update(id, {
    name: `TagName2-${uuid.v4()}`,
  });

  return updated_service_tag;
};

const createAndUpdateService = async (
  client: Client,
  location_id: string,
  floor_id: string,
  service_tag_id: string,
): Promise<ApiService> => {
  const created_service = await client.services.create({
    type: 'massage',
    tags: [],
    name: 'Service Name',
    description: 'Service Description',
    equipment: ['massage_chair'],
    resources: [
      {
        name: 'Massage Chair',
      },
    ],
    floor_id,
    location_id,
  });

  const { id, type, name, equipment, description, resources } = created_service;

  const updated_service = await client.services.update(id, {
    type,
    tags: [service_tag_id],
    name,
    description,
    resources: [
      {
        ...resources[0],
        booking_ref: {
          connector_id: uuid.v4(),
          resource_id: uuid.v4(),
        },
      },
    ],
    equipment,
    floor_id,
    location_id,
  });

  return updated_service;
};

const createAndUpdateFeature = async (
  client: Client,
  location_id: string,
  floor_id: string,
  unit_id: string,
  service_id: string,
): Promise<ApiFeature> => {
  const created_feature = await client.features.create({
    type: 'Feature',
    properties: {
      location_id,
      floor_id,
      unit_id,
    },
    geometry: {
      type: 'Point',
      coordinates: [0, 0],
    },
  });

  const { properties, geometry } = created_feature;

  const updated_feature = await client.features.update(
    properties?.id as string,
    {
      type: 'Feature',
      properties: {
        ...properties,
        service_id,
      },
      geometry,
    },
  );

  return updated_feature as unknown as ApiFeature;
};

void (async () => {
  try {
    const location = await createAndUpdateLocation(client);

    const floor = await createAndUpdateFloor(client, location.id);

    const unit = await createAndUpdateUnit(client, floor.id);

    const service_tag = await createAndUpdateServiceTag(client);

    const service = await createAndUpdateService(
      client,
      location.id,
      floor.id,
      service_tag.id,
    );

    const feature = await createAndUpdateFeature(
      client,
      location.id,
      floor.id,
      unit.id,
      service.id,
    );

    if (!feature.properties?.id) {
      throw new Error('Feature id is missing');
    }
    await client.features.delete(feature.properties?.id);
    await client.services.delete(service.id);
    await client.serviceTags.delete(service_tag.id);
    await client.units.delete(unit.id);
    await client.floors.delete(floor.id);
    await client.locations.delete(location.id);
  } catch (e) {
    console.error(e);
    const err = e as AxiosError<{ message: string; errors: unknown }>;
    if (err.response) {
      console.error(err.response.data);
    }
    process.exit(1);
  }
})();
