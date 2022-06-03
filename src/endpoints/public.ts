import call from '../call';

import type { ViuDmsClientOptions } from '../options';
import type { ApiDevice, ApiDeviceLocationPublicRequest } from '../api';

interface PublicOperations {
  devices: {
    get: (id: string) => Promise<ApiDevice>;
    getConfig: <T>(id: string) => Promise<T>;
    updateLocation: (
      id: string,
      location: ApiDeviceLocationPublicRequest,
    ) => Promise<ApiDevice>;
  };
}

export const publicOperations = (
  opts: ViuDmsClientOptions,
): PublicOperations => ({
  devices: {
    get: async (id) =>
      await call<undefined, ApiDevice>('GET', `/public/devices/${id}`, {
        ...opts,
        noAuth: true,
      }),
    getConfig: async <T>(id: string) =>
      await call<undefined, T>('GET', `/public/devices/${id}/config`, {
        ...opts,
        noAuth: true,
      }),
    updateLocation: async (id, location) =>
      await call<ApiDeviceLocationPublicRequest, ApiDevice>(
        'PUT',
        `/public/devices/${id}/location`,
        {
          ...opts,
          body: location,
          noAuth: true,
        },
      ),
  },
});
