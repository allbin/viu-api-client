import { ViuDmsClientOptions } from './options';

import { deviceOperations, publicOperations } from './endpoints';

interface IViuDmsApiClient {
  public: ReturnType<typeof publicOperations>;
  devices: ReturnType<typeof deviceOperations>;
}

const ViuDmsApiClient = (opts: ViuDmsClientOptions): IViuDmsApiClient => ({
  devices: deviceOperations(opts),
  public: publicOperations(opts),
});

export { ViuDmsApiClient, IViuDmsApiClient };

export * from './api';
