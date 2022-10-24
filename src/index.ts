import { ViuDmsClientOptions } from './options';

import {
  deviceOperations,
  deviceEventOperations,
  publicOperations,
} from './endpoints';

interface IViuDmsApiClient {
  public: ReturnType<typeof publicOperations>;
  devices: ReturnType<typeof deviceOperations>;
  deviceEvents: ReturnType<typeof deviceEventOperations>;
}

const ViuDmsApiClient = (opts: ViuDmsClientOptions): IViuDmsApiClient => ({
  devices: deviceOperations(opts),
  deviceEvents: deviceEventOperations(opts),
  public: publicOperations(opts),
});

export { ViuDmsApiClient, IViuDmsApiClient };
export { makeDeviceId } from './utils';

export * from './api';
