import { ApiNameTag } from '@allbin/viu-types';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { DateTime } from 'luxon';

import { ViuApiClient } from './index';

interface AuthCtx {
  token?: string;
}

const ctx: AuthCtx = {};

const isValid = (token: string): boolean => {
  try {
    const decoded = jwt.decode(token, { json: true });
    if (!decoded) {
      return false;
    }

    if (!decoded.exp) {
      return true;
    }

    if (
      DateTime.now() >
      DateTime.fromMillis(decoded.exp * 1000).minus({ seconds: 60 })
    ) {
      return false;
    }

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const getToken = async (): Promise<string> => {
  if (ctx.token && isValid(ctx.token)) {
    return ctx.token;
  }

  const response = await axios.post<{ access_token: string }>(
    'https://allbin.eu.auth0.com/oauth/token',
    {
      audience: 'https://api.viu-dms.dev.allbin.se',
      grant_type: 'client_credentials',
      client_id: 'vCEC4uiW9ztEeoBwf7bLyP1iquZjXppX',
      client_secret: process.env.CLIENT_SECRET,
    },
  );

  ctx.token = response.data.access_token;
  return ctx.token;
};

void (async () => {
  try {
    const client = ViuApiClient({
      baseUrl: 'http://localhost:50000',
      token: getToken,
    });

    const connectors = await client.public.tags.getBookingConnectors('2222');
    console.log(connectors);
    const resources = await client.public.bookingconnectors.getResources(
      connectors[0].id,
      'Europe/Stockholm',
    );
    console.log(resources);

    const tags = await client.tags.list();
    console.log(tags);
    if (!tags || tags.length === 0) {
      console.log('no existing tags. exiting...');
      process.exit(0);
    }

    const tag_locations = await client.public.tags.getLocations(tags[0].id);
    console.log(tag_locations);
    if (!tag_locations || tag_locations.length === 0) {
      console.log('no existing locations. exiting...');
      process.exit(0);
    }

    const apartments = await client.public.locations.getApartments(
      tag_locations[0].id,
    );
    console.log(apartments);
    if (!apartments || apartments.length === 0) {
      console.log('no existing apartments. exiting...');
      process.exit(0);
    }

    const install_tag = await client.public.nametags.install(tags[0].id, {
      location_id: (tags[0] as ApiNameTag).location_id,
      unit: (tags[0] as ApiNameTag).unit,
    });
    console.log('installed tag', install_tag);

    const devices = await client.devices.list();
    console.log(devices);
    if (!devices || devices.length === 0) {
      console.log('no existing devices. exiting...');
      process.exit(0);
    }

    const online_device = devices.find(
      (d) => d.status.hardware_online === true,
    );
    if (!online_device) {
      console.log('no online devices found. exiting...');
      process.exit(0);
    }

    const screenshot = await client.devices.screenshot(online_device.id);
    console.log(screenshot);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
