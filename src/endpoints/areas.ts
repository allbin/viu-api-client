import call from '../call';

import { type ViuApiClientOptions } from '../options';

import type { ApiArea, ApiAreaRequest } from '@allbin/viu-types';

interface AreaOperations {
  list: (location_id?: string) => Promise<ApiArea[]>;
  get: (id: string) => Promise<ApiArea>;
  create: (area: ApiAreaRequest) => Promise<ApiArea>;
  update: (id: string, area: ApiAreaRequest) => Promise<ApiArea>;
  delete: (id: string) => Promise<ApiArea>;
}

export const areaOperations = (opts: ViuApiClientOptions): AreaOperations => ({
  list: async (location_id) =>
    await call<undefined, ApiArea[]>('GET', '/areas', {
      ...opts,
      params: location_id ? { location_id } : {},
    }),
  get: async (id) =>
    await call<undefined, ApiArea>('GET', `/areas/${id}`, { ...opts }),
  create: async (area) =>
    await call<ApiAreaRequest, ApiArea>('POST', '/areas', {
      ...opts,
      body: area,
    }),
  update: async (id, area) =>
    await call<ApiAreaRequest, ApiArea>('PUT', `/areas/${id}`, {
      ...opts,
      body: area,
    }),
  delete: async (id) =>
    await call<undefined, ApiArea>('DELETE', `/areas/${id}`, opts),
});
