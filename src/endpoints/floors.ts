import call from '../call';

import { type ViuApiClientOptions } from '../options';

import type {
  ApiFloor,
  ApiFloorRequest,
  ApiFloorUpdateRequest,
} from '@allbin/viu-types';

interface FloorOperations {
  list: (location_id?: string) => Promise<ApiFloor[]>;
  create: (floor: ApiFloorRequest) => Promise<ApiFloor>;
  update: (id: string, floor: ApiFloorUpdateRequest) => Promise<ApiFloor>;
  delete: (id: string) => Promise<void>;
}

export const floorOperations = (
  opts: ViuApiClientOptions,
): FloorOperations => ({
  list: async (location_id) =>
    await call<undefined, ApiFloor[]>('GET', '/floors', {
      ...opts,
      params: location_id ? { location_id } : {},
    }),
  create: async (floor) =>
    await call<ApiFloorRequest, ApiFloor>('POST', '/floors', {
      ...opts,
      body: floor,
    }),
  update: async (id, floor) =>
    await call<ApiFloorUpdateRequest, ApiFloor>('PUT', `/floors/${id}`, {
      ...opts,
      body: floor,
    }),
  delete: async (id) =>
    await call<undefined, void>('DELETE', `/floors/${id}`, opts),
});
