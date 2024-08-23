import call from '../call';

import { ViuApiClientOptions } from '../options';
import type { GeoJSON } from '@allbin/viu-types';

interface FeatureOperations {
  list: () => Promise<GeoJSON.FeatureCollection>;
  listByArea: (area_id: string) => Promise<GeoJSON.FeatureCollection>;
  listByLocation: (location_id: string) => Promise<GeoJSON.FeatureCollection>;
  listByFloor: (floor_id: string) => Promise<GeoJSON.FeatureCollection>;
  create: (feature: GeoJSON.Feature) => Promise<GeoJSON.Feature>;
  update: (id: string, feature: GeoJSON.Feature) => Promise<GeoJSON.Feature>;
  delete: (id: string) => Promise<GeoJSON.Feature>;
}

export const featureOperations = (
  opts: ViuApiClientOptions,
): FeatureOperations => ({
  list: async () =>
    await call<undefined, GeoJSON.FeatureCollection>('GET', '/features', {
      ...opts,
    }),
  listByArea: async (area_id) =>
    await call<undefined, GeoJSON.FeatureCollection>('GET', `/features`, {
      ...opts,
      params: {
        area_id,
      },
    }),
  listByLocation: async (location_id) =>
    await call<undefined, GeoJSON.FeatureCollection>('GET', `/features`, {
      ...opts,
      params: {
        location_id,
      },
    }),
  listByFloor: async (floor_id) =>
    await call<undefined, GeoJSON.FeatureCollection>('GET', `/features`, {
      ...opts,
      params: {
        floor_id,
      },
    }),
  create: async (feature) =>
    await call<GeoJSON.Feature, GeoJSON.Feature>('POST', '/features', {
      ...opts,
      body: feature,
    }),
  update: async (id, feature) =>
    await call<GeoJSON.Feature, GeoJSON.Feature>('PUT', `/features/${id}`, {
      ...opts,
      body: feature,
    }),
  delete: async (id) =>
    await call<undefined, GeoJSON.Feature>('DELETE', `/features/${id}`, {
      ...opts,
    }),
});
