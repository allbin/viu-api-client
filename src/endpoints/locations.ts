import call from '../call';

import type { ViuApiClientOptions } from '../options';

import type { ApiLocation, ApiLocationRequest } from '@allbin/viu-types';

interface LocationOperations {
  list: () => Promise<ApiLocation[]>;
  get: (id: string) => Promise<ApiLocation>;
  create: (location: ApiLocationRequest) => Promise<ApiLocation>;
  update: (id: string, location: ApiLocationRequest) => Promise<ApiLocation>;
  delete: (id: string) => Promise<ApiLocation>;
}

export const locationOperations = (
  opts: ViuApiClientOptions,
): LocationOperations => ({
  list: async () =>
    await call<undefined, ApiLocation[]>('GET', `/locations`, { ...opts }),
  get: async (id) =>
    await call<undefined, ApiLocation>('GET', `/locations/${id}`, { ...opts }),
  create: async (location) =>
    await call<ApiLocationRequest, ApiLocation>('POST', `/locations`, {
      ...opts,
      body: location,
    }),
  update: async (id, location) =>
    await call<ApiLocationRequest, ApiLocation>('PUT', `/locations/${id}`, {
      ...opts,
      body: location,
    }),
  delete: async (id) =>
    await call<undefined, ApiLocation>('DELETE', `/locations/${id}`, {
      ...opts,
    }),
});
