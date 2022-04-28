import { ViuDmsClientOptions } from './options';

import { deviceOperations } from './endpoints';

interface IViuDmsApiClient {
  devices: ReturnType<typeof deviceOperations>;
}

const ViuDmsApiClient = (opts: ViuDmsClientOptions): IViuDmsApiClient => ({
  devices: deviceOperations(opts),
});

export { ViuDmsApiClient, IViuDmsApiClient };

export * from './api';
