import { ViuApiClientOptions } from './options';

import {
  announcementOperations,
  attachmentOperations,
  deviceOperations,
  deviceEventOperations,
  embeddedUrlOperations,
  locationOperations,
  organizationOperations,
  profileOperations,
  publicOperations,
  userOperations,
} from './endpoints';

interface IViuApiApiClient {
  public: ReturnType<typeof publicOperations>;
  announcements: ReturnType<typeof announcementOperations>;
  attachments: ReturnType<typeof attachmentOperations>;
  devices: ReturnType<typeof deviceOperations>;
  deviceEvents: ReturnType<typeof deviceEventOperations>;
  embeddedUrls: ReturnType<typeof embeddedUrlOperations>;
  locations: ReturnType<typeof locationOperations>;
  organizations: ReturnType<typeof organizationOperations>;
  profile: ReturnType<typeof profileOperations>;
  users: ReturnType<typeof userOperations>;
}

const ViuApiApiClient = (opts: ViuApiClientOptions): IViuApiApiClient => ({
  announcements: announcementOperations(opts),
  attachments: attachmentOperations(opts),
  devices: deviceOperations(opts),
  deviceEvents: deviceEventOperations(opts),
  embeddedUrls: embeddedUrlOperations(opts),
  locations: locationOperations(opts),
  organizations: organizationOperations(opts),
  profile: profileOperations(opts),
  public: publicOperations(opts),
  users: userOperations(opts),
});

export { ViuApiApiClient, IViuApiApiClient };
export { makeDeviceId } from './utils';

export * from './api';
