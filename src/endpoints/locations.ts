import call from '../call';

import type { ViuApiClientOptions } from '../options';

import type {
  ApiLocation,
  ApiLocationRequest,
  ApiApartment,
  ApiApartmentRequest,
} from '@allbin/viu-types';

interface LocationOperations {
  list: () => Promise<ApiLocation[]>;
  get: (id: string) => Promise<ApiLocation>;
  create: (location: ApiLocationRequest) => Promise<ApiLocation>;
  update: (id: string, location: ApiLocationRequest) => Promise<ApiLocation>;
  delete: (id: string) => Promise<ApiLocation>;

  /** lists apartments for a location id */
  listApartments: (location_id: string) => Promise<ApiApartment[]>;
  getApartment: (location_id: string, id: string) => Promise<ApiApartment>;
  createApartment: (
    location_id: string,
    apartment: ApiApartmentRequest,
  ) => Promise<ApiApartment>;
  updateApartment: (
    location_id: string,
    id: string,
    apartment: ApiApartmentRequest,
  ) => Promise<ApiApartment>;
  /** delete all apartments for a location id */
  deleteApartments: (location_id: string) => Promise<ApiApartment[]>;
  deleteApartment: (location_id: string, id: string) => Promise<ApiApartment>;
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
  listApartments: async (location_id) =>
    await call<undefined, ApiApartment[]>(
      'GET',
      `/locations/${location_id}/apartments`,
      {
        ...opts,
      },
    ),
  getApartment: async (location_id, id) =>
    await call<undefined, ApiApartment>(
      'GET',
      `/locations/${location_id}/apartments/${id}`,
      { ...opts },
    ),
  createApartment: async (location_id, apartment) =>
    await call<ApiApartmentRequest, ApiApartment>(
      'POST',
      `/locations/${location_id}/apartments`,
      { ...opts, body: apartment },
    ),
  updateApartment: async (location_id, id, apartment) =>
    await call<ApiApartmentRequest, ApiApartment>(
      'PUT',
      `/locations/${location_id}/apartments/${id}`,
      { ...opts, body: apartment },
    ),
  deleteApartments: async (location_id) =>
    await call<undefined, ApiApartment[]>(
      'DELETE',
      `/locations/${location_id}`,
      { ...opts },
    ),
  deleteApartment: async (location_id, id) =>
    await call<undefined, ApiApartment>(
      'DELETE',
      `/locations/${location_id}/apartments/${id}`,
      { ...opts },
    ),
});
