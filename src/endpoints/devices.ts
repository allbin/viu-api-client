import call from '../call';

import type { ViuDmsClientOptions } from '../options';
import type {
  ApiDevice,
  ApiDeviceType,
  ApiDeviceDBRequest,
  ApiDeviceRequest,
} from '../api';

interface DeviceOperations {
  list: (type?: ApiDeviceType, hardware_id?: string) => Promise<ApiDevice[]>;
  get: (id: string) => Promise<ApiDevice>;
  create: (device: ApiDeviceDBRequest) => Promise<ApiDevice>;
  patch: (id: string, device: ApiDeviceRequest) => Promise<ApiDevice>;
  delete: (id: string) => Promise<ApiDevice>;

  screenshot: (id: string) => Promise<ArrayBuffer>;
}

export const deviceOperations = (
  opts: ViuDmsClientOptions,
): DeviceOperations => ({
  list: async (type, hardware_id) => {
    const query =
      type || hardware_id
        ? { ...(type ? { type } : {}), ...(hardware_id ? { hardware_id } : {}) }
        : undefined;

    const qstring = query
      ? '?' +
        Object.entries(query)
          .map(([k, v]) => `${k}=${v}`)
          .join('&')
      : '';

    return await call<undefined, ApiDevice[]>('GET', `/devices${qstring}`, {
      ...opts,
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

  screenshot: async (id) =>
    await call<undefined, ArrayBuffer>('GET', `/devices/${id}/screenshot`, {
      ...opts,
      responseType: 'arraybuffer',
    }),
});
