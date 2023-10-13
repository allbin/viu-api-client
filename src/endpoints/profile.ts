import call from '../call';

import type { ViuApiClientOptions } from '../options';

import type { ApiProfile } from '@allbin/viu-types';

interface ProfileOperations {
  get: () => Promise<ApiProfile>;
  put: (profile: ApiProfile) => Promise<ApiProfile>;
}

export const profileOperations = (
  opts: ViuApiClientOptions,
): ProfileOperations => ({
  get: async () =>
    await call<undefined, ApiProfile>('GET', `/profile`, { ...opts }),
  put: async (profile) =>
    await call<ApiProfile, ApiProfile>('PUT', `/profile`, {
      ...opts,
      body: profile,
    }),
});
