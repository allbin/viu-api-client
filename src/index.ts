import { ViuDmsClientOptions } from './options';

import {
  deviceOperations,
  deviceEventOperations,
  organizationOperations,
  profileOperations,
  publicOperations,
} from './endpoints';

interface IViuDmsApiClient {
  public: ReturnType<typeof publicOperations>;
  devices: ReturnType<typeof deviceOperations>;
  deviceEvents: ReturnType<typeof deviceEventOperations>;
  organizations: ReturnType<typeof organizationOperations>;
  profile: ReturnType<typeof profileOperations>;
}

const ViuDmsApiClient = (opts: ViuDmsClientOptions): IViuDmsApiClient => ({
  devices: deviceOperations(opts),
  deviceEvents: deviceEventOperations(opts),
  organizations: organizationOperations(opts),
  profile: profileOperations(opts),
  public: publicOperations(opts),
});

export { ViuDmsApiClient, IViuDmsApiClient };
export { makeDeviceId } from './utils';

export * from './api';
