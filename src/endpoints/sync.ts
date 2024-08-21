import { ApiSyncUnitsRequest } from '@allbin/viu-types';
import call from '../call';

import type { ViuApiClientOptions } from '../options';

interface SyncOperations {
  apartments: (data: ApiSyncUnitsRequest) => Promise<void>;
}

export const syncOperations = (opts: ViuApiClientOptions): SyncOperations => ({
  apartments: async (data) => {
    await call<ApiSyncUnitsRequest, void>('POST', `/sync/units`, {
      ...opts,
      body: data,
    });
  },
});
