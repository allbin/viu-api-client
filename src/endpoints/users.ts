import call from '../call';

import type { ViuDmsClientOptions } from '../options';
import type { ApiUser } from '../api';

interface UserOperations {
  list: () => Promise<ApiUser[]>;
}

export const userOperations = (opts: ViuDmsClientOptions): UserOperations => ({
  list: async () =>
    await call<undefined, ApiUser[]>('GET', `/users`, { ...opts }),
});
