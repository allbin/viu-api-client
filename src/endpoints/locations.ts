import call from '../call';

import type { ViuApiClientOptions } from '../options';

import type {
  ApiLocation,
  ApiLocationRequest,
  ApiApartment,
  ApiApartmentRequest,
} from '../api';

interface LocationOperations {
  list: () => Promise<ApiLocation[]>;
  get: (id: string) => Promise<ApiLocation>;
  create: (location: ApiLocationRequest) => Promise<ApiLocation>;
  update: (id: string, location: ApiLocationRequest) => Promise<ApiLocation>;
  delete: (id: string) => Promise<ApiLocation>;

  /** lists apartments for a location id */
  listApartments: (id: string) => Promise<ApiApartment[]>;
  /** replaces apartments for a location id */
  setApartments: (
    id: string,
    apartments: ApiApartmentRequest[],
  ) => Promise<ApiApartment[]>;
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
  listApartments: async (id) =>
    await call<undefined, ApiApartment[]>(
      'GET',
      `/locations/${id}/apartments`,
      {
        ...opts,
      },
    ),
  setApartments: async (id, apartments) =>
    await call<ApiApartmentRequest[], ApiApartment[]>(
      'PUT',
      `/locations/${id}/apartments`,
      { ...opts, body: apartments },
    ),
});
