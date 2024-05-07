import { ViuApiClientOptions } from './options';

import {
  announcementOperations,
  attachmentOperations,
  deviceOperations,
  deviceEventOperations,
  embeddedUrlOperations,
  featureOperations,
  floorOperations,
  locationOperations,
  organizationOperations,
  profileOperations,
  publicOperations,
  serviceTagOperations,
  serviceOperations,
  syncOperations,
  tagOperations,
  unitOperations,
  userOperations,
} from './endpoints';

interface IViuApiClient {
  public: ReturnType<typeof publicOperations>;
  announcements: ReturnType<typeof announcementOperations>;
  attachments: ReturnType<typeof attachmentOperations>;
  devices: ReturnType<typeof deviceOperations>;
  deviceEvents: ReturnType<typeof deviceEventOperations>;
  embeddedUrls: ReturnType<typeof embeddedUrlOperations>;
  floors: ReturnType<typeof floorOperations>;
  features: ReturnType<typeof featureOperations>;
  locations: ReturnType<typeof locationOperations>;
  organizations: ReturnType<typeof organizationOperations>;
  profile: ReturnType<typeof profileOperations>;
  serviceTags: ReturnType<typeof serviceTagOperations>;
  services: ReturnType<typeof serviceOperations>;
  sync: ReturnType<typeof syncOperations>;
  tags: ReturnType<typeof tagOperations>;
  units: ReturnType<typeof unitOperations>;
  users: ReturnType<typeof userOperations>;
}

const ViuApiClient = (opts: ViuApiClientOptions): IViuApiClient => ({
  announcements: announcementOperations(opts),
  attachments: attachmentOperations(opts),
  devices: deviceOperations(opts),
  deviceEvents: deviceEventOperations(opts),
  embeddedUrls: embeddedUrlOperations(opts),
  features: featureOperations(opts),
  floors: floorOperations(opts),
  locations: locationOperations(opts),
  organizations: organizationOperations(opts),
  profile: profileOperations(opts),
  public: publicOperations(opts),
  serviceTags: serviceTagOperations(opts),
  services: serviceOperations(opts),
  sync: syncOperations(opts),
  tags: tagOperations(opts),
  units: unitOperations(opts),
  users: userOperations(opts),
});

export { ViuApiClient, IViuApiClient };
export { makeDeviceId } from './utils';

export * from '@allbin/viu-types';
