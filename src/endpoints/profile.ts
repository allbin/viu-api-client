import call from '../call';

import type { ViuDmsClientOptions } from '../options';

import type { ApiProfile } from '../api';

interface ProfileOperations {
  get: () => Promise<ApiProfile>;
  put: (profile: ApiProfile) => Promise<ApiProfile>;
}

export const profileOperations = (
  opts: ViuDmsClientOptions,
): ProfileOperations => ({
  get: async () =>
    await call<undefined, ApiProfile>('GET', `/profile`, { ...opts }),
  put: async (profile) =>
    await call<ApiProfile, ApiProfile>('PUT', `/profile`, {
      ...opts,
      body: profile,
    }),
});
