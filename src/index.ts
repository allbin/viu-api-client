import { ViuDmsClientOptions } from './options';

import {
  deviceOperations,
  deviceEventOperations,
  organizationOperations,
  profileOperations,
  publicOperations,
  userOperations,
} from './endpoints';

interface IViuDmsApiClient {
  public: ReturnType<typeof publicOperations>;
  devices: ReturnType<typeof deviceOperations>;
  deviceEvents: ReturnType<typeof deviceEventOperations>;
  organizations: ReturnType<typeof organizationOperations>;
  profile: ReturnType<typeof profileOperations>;
  users: ReturnType<typeof userOperations>;
}

const ViuDmsApiClient = (opts: ViuDmsClientOptions): IViuDmsApiClient => ({
  devices: deviceOperations(opts),
  deviceEvents: deviceEventOperations(opts),
  organizations: organizationOperations(opts),
  profile: profileOperations(opts),
  public: publicOperations(opts),
  users: userOperations(opts),
});

export { ViuDmsApiClient, IViuDmsApiClient };
export { makeDeviceId } from './utils';

export * from './api';
