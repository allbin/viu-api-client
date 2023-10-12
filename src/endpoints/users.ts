import call from '../call';

import type { ViuApiClientOptions } from '../options';
import type { ApiUser } from '@allbin/viu-types';

interface UserOperations {
  list: () => Promise<ApiUser[]>;
}

export const userOperations = (opts: ViuApiClientOptions): UserOperations => ({
  list: async () =>
    await call<undefined, ApiUser[]>('GET', `/users`, { ...opts }),
});
