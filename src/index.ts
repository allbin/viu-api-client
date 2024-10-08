import { ViuApiClientOptions } from './options';

import {
  announcementOperations,
  areaOperations,
  attachmentOperations,
  deviceOperations,
  deviceEventOperations,
  embeddedUrlOperations,
  featureOperations,
  floorOperations,
  imageOperations,
  locationOperations,
  organizationOperations,
  profileOperations,
  publicOperations,
  serviceOperations,
  syncOperations,
  tagOperations,
  unitOperations,
  userOperations,
} from './endpoints';

interface IViuApiClient {
  public: ReturnType<typeof publicOperations>;
  announcements: ReturnType<typeof announcementOperations>;
  areas: ReturnType<typeof areaOperations>;
  attachments: ReturnType<typeof attachmentOperations>;
  devices: ReturnType<typeof deviceOperations>;
  deviceEvents: ReturnType<typeof deviceEventOperations>;
  embeddedUrls: ReturnType<typeof embeddedUrlOperations>;
  floors: ReturnType<typeof floorOperations>;
  features: ReturnType<typeof featureOperations>;
  images: ReturnType<typeof imageOperations>;
  locations: ReturnType<typeof locationOperations>;
  organizations: ReturnType<typeof organizationOperations>;
  profile: ReturnType<typeof profileOperations>;
  services: ReturnType<typeof serviceOperations>;
  sync: ReturnType<typeof syncOperations>;
  tags: ReturnType<typeof tagOperations>;
  units: ReturnType<typeof unitOperations>;
  users: ReturnType<typeof userOperations>;
}

const ViuApiClient = (opts: ViuApiClientOptions): IViuApiClient => ({
  announcements: announcementOperations(opts),
  areas: areaOperations(opts),
  attachments: attachmentOperations(opts),
  devices: deviceOperations(opts),
  deviceEvents: deviceEventOperations(opts),
  embeddedUrls: embeddedUrlOperations(opts),
  features: featureOperations(opts),
  floors: floorOperations(opts),
  images: imageOperations(opts),
  locations: locationOperations(opts),
  organizations: organizationOperations(opts),
  profile: profileOperations(opts),
  public: publicOperations(opts),
  services: serviceOperations(opts),
  sync: syncOperations(opts),
  tags: tagOperations(opts),
  units: unitOperations(opts),
  users: userOperations(opts),
});

export { ViuApiClient, IViuApiClient };
export { makeDeviceId } from './utils';

export * from '@allbin/viu-types';
