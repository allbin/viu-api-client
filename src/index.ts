import { ViuDmsClientOptions } from './options';

import { deviceOperations, publicOperations } from './endpoints';
import { utils } from './utils';

interface IViuDmsApiClient {
  utils: ReturnType<typeof utils>;
  public: ReturnType<typeof publicOperations>;
  devices: ReturnType<typeof deviceOperations>;
}

const ViuDmsApiClient = (opts: ViuDmsClientOptions): IViuDmsApiClient => ({
  utils: utils(),
  devices: deviceOperations(opts),
  public: publicOperations(opts),
});

export { ViuDmsApiClient, IViuDmsApiClient };

export * from './api';
