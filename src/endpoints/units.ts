import call from '../call';
import { type ViuApiClientOptions } from '../options';

import type {
  ApiUnit,
  ApiUnitRequest,
  ApiUnitUpdateRequest,
} from '@allbin/viu-types';

interface UnitOperations {
  list: (params: {
    floor_id?: string;
    location_id?: string;
  }) => Promise<ApiUnit[]>;
  create: (unit: ApiUnitRequest) => Promise<ApiUnit>;
  update: (id: string, unit: ApiUnitUpdateRequest) => Promise<ApiUnit>;
  delete: (id: string) => Promise<ApiUnit>;
}

export const unitOperations = (opts: ViuApiClientOptions): UnitOperations => ({
  list: async ({ floor_id, location_id }) =>
    await call<undefined, ApiUnit[]>('GET', '/units', {
      ...opts,
      params: { location_id, floor_id },
    }),
  create: async (unit) =>
    await call<ApiUnitRequest, ApiUnit>('POST', '/units', {
      ...opts,
      body: unit,
    }),
  update: async (id, unit) =>
    await call<ApiUnitUpdateRequest, ApiUnit>('PUT', `/units/${id}`, {
      ...opts,
      body: unit,
    }),
  delete: async (id) =>
    await call<undefined, ApiUnit>('DELETE', `/units/${id}`, opts),
});
