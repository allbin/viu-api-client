import { ApiSyncApartmentsRequest } from '@allbin/viu-types';
import call from '../call';

import type { ViuApiClientOptions } from '../options';

interface SyncOperations {
  apartments: (data: ApiSyncApartmentsRequest) => Promise<void>;
}

export const syncOperations = (opts: ViuApiClientOptions): SyncOperations => ({
  apartments: async (data) => {
    await call<ApiSyncApartmentsRequest, void>('POST', `/sync/apartments`, {
      ...opts,
      body: data,
    });
  },
});
