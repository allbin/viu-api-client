import call from '../call';

import { type ViuApiClientOptions } from '../options';

import type { ApiService, ApiServiceRequest } from '@allbin/viu-types';

interface ServiceOperations {
  list: () => Promise<ApiService[]>;
  listByTag: (tag_id: string) => Promise<ApiService[]>;
  listByFloor: (floor_id: string) => Promise<ApiService[]>;
  listByLocation: (location_id: string) => Promise<ApiService[]>;
  create: (service: ApiServiceRequest) => Promise<ApiService>;
  update: (
    service_id: string,
    service: ApiServiceRequest,
  ) => Promise<ApiService>;
  delete: (service_id: string) => Promise<ApiService>;
}

export const serviceOperations = (
  opts: ViuApiClientOptions,
): ServiceOperations => ({
  list: async () =>
    await call<undefined, ApiService[]>('GET', '/services', opts),
  listByTag: async (tag_id) =>
    await call<undefined, ApiService[]>('GET', `/services`, {
      ...opts,
      params: { tag_id },
    }),
  listByFloor: async (floor_id) =>
    await call<undefined, ApiService[]>('GET', `/services`, {
      ...opts,
      params: { floor_id },
    }),
  listByLocation: async (location_id) =>
    await call<undefined, ApiService[]>('GET', `/services`, {
      ...opts,
      params: { location_id },
    }),
  create: async (service) =>
    await call<ApiServiceRequest, ApiService>('POST', '/services', {
      ...opts,
      body: service,
    }),
  update: async (service_id, service) =>
    await call<ApiServiceRequest, ApiService>(
      'PUT',
      `/services/${service_id}`,
      {
        ...opts,
        body: service,
      },
    ),
  delete: async (service_id) =>
    await call<undefined, ApiService>(
      'DELETE',
      `/services/${service_id}`,
      opts,
    ),
});
