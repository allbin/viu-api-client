import call from '../call';

import type { ViuDmsClientOptions } from '../options';
import type { ApiDevice, ApiDeviceRequest, ApiDeviceLocation } from '../api';

interface DeviceOperations {
  list: () => Promise<ApiDevice[]>;
  get: (id: string) => Promise<ApiDevice>;
  create: (device: ApiDeviceRequest) => Promise<ApiDevice>;
  update: (id: string, device: ApiDeviceRequest) => Promise<ApiDevice>;
  delete: (id: string) => Promise<ApiDevice>;

  updateLocation: (
    id: string,
    location: ApiDeviceLocation,
  ) => Promise<ApiDevice>;
}

export const deviceOperations = (
  opts: ViuDmsClientOptions,
): DeviceOperations => ({
  list: async () =>
    await call<undefined, ApiDevice[]>('GET', `/devices`, { ...opts }),
  get: async (id) =>
    await call<undefined, ApiDevice>('GET', `/devices/${id}`, { ...opts }),
  create: async (device) =>
    await call<ApiDeviceRequest, ApiDevice>('POST', `/devices`, {
      ...opts,
      body: device,
    }),
  update: async (id, device) =>
    await call<ApiDeviceRequest, ApiDevice>('PUT', `/devices/${id}`, {
      ...opts,
      body: device,
    }),
  delete: async (id) =>
    await call<undefined, ApiDevice>('DELETE', `/devices/${id}`, { ...opts }),
  updateLocation: async (id, location) =>
    await call<ApiDeviceLocation, ApiDevice>('PATCH', `/devices/${id}`, {
      ...opts,
      body: location,
    }),
});
