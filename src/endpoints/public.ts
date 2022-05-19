import call from '../call';

import type { ViuDmsClientOptions } from '../options';
import type { ApiDevice } from '../api';

interface PublicOperations {
  devices: {
    get: (id: string) => Promise<ApiDevice>;
  };
}

export const publicOperations = (
  opts: ViuDmsClientOptions,
): PublicOperations => ({
  devices: {
    get: async (id) =>
      await call<undefined, ApiDevice>('GET', `/public/devices/${id}`, {
        ...opts,
        noAuth: true,
      }),
  },
});
