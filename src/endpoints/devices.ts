import call from '../call';

import type { ViuApiClientOptions } from '../options';
import type { ApiDevice, ApiDeviceDBRequest, ApiDeviceRequest } from '../api';

interface DeviceOperations {
  list: (location_id?: string) => Promise<ApiDevice[]>;
  get: (id: string) => Promise<ApiDevice>;
  create: (device: ApiDeviceDBRequest) => Promise<ApiDevice>;
  patch: (id: string, device: ApiDeviceRequest) => Promise<ApiDevice>;
  delete: (id: string) => Promise<ApiDevice>;
  reboot: (id: string) => Promise<void>;
  uninstall: (id: string) => Promise<ApiDevice>;
  factoryReset: (id: string) => Promise<void>;
  screenshot: (id: string) => Promise<ArrayBuffer>;
}

export const deviceOperations = (
  opts: ViuApiClientOptions,
): DeviceOperations => ({
  list: async (location_id) => {
    return await call<undefined, ApiDevice[]>('GET', `/devices`, {
      ...opts,
      params: location_id ? { location_id } : {},
    });
  },
  get: async (id) =>
    await call<undefined, ApiDevice>('GET', `/devices/${id}`, { ...opts }),
  create: async (device) =>
    await call<ApiDeviceDBRequest, ApiDevice>('POST', `/devices`, {
      ...opts,
      body: device,
    }),
  patch: async (id, device) =>
    await call<ApiDeviceRequest, ApiDevice>('PATCH', `/devices/${id}`, {
      ...opts,
      body: device,
    }),
  delete: async (id) =>
    await call<undefined, ApiDevice>('DELETE', `/devices/${id}`, { ...opts }),
  reboot: async (id) =>
    await call<undefined, undefined>('POST', `/devices/${id}/reboot`, {
      ...opts,
    }),
  uninstall: async (id) =>
    await call<undefined, ApiDevice>('PUT', `/devices/${id}/uninstall`, {
      ...opts,
    }),
  factoryReset: async (id) =>
    await call<undefined, undefined>('POST', `/devices/${id}/factory_reset`, {
      ...opts,
    }),
  screenshot: async (id) =>
    await call<undefined, ArrayBuffer>('GET', `/devices/${id}/screenshot`, {
      ...opts,
      responseType: 'arraybuffer',
    }),
});
