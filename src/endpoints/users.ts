import call from '../call';

import type { ViuApiClientOptions } from '../options';
import type { ApiUser } from '../api';

interface UserOperations {
  list: () => Promise<ApiUser[]>;
}

export const userOperations = (opts: ViuApiClientOptions): UserOperations => ({
  list: async () =>
    await call<undefined, ApiUser[]>('GET', `/users`, { ...opts }),
});
