import call from '../call';

import type { ViuApiClientOptions } from '../options';
import type { ApiUser } from '@allbin/viu-types';

interface UserOperations {
  list: (ids: string[]) => Promise<ApiUser[]>;
}

export const userOperations = (opts: ViuApiClientOptions): UserOperations => ({
  list: async (ids: string[]) =>
    await call<undefined, ApiUser[]>('GET', `/users`, {
      ...opts,
      params: {
        ids: ids.join(','),
      },
    }),
});
