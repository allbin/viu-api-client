import { ApiSyncUnitsRequest } from '@allbin/viu-types';
import call from '../call';

import type { ViuApiClientOptions } from '../options';

interface SyncOperations {
  units: (data: ApiSyncUnitsRequest) => Promise<void>;
}

export const syncOperations = (opts: ViuApiClientOptions): SyncOperations => ({
  units: async (data) => {
    await call<ApiSyncUnitsRequest, void>('POST', `/sync/units`, {
      ...opts,
      body: data,
    });
  },
});
