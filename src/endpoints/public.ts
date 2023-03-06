import call from '../call';

import type { ViuApiClientOptions } from '../options';
import type {
  ApiOrganization,
  ApiDevice,
  ApiLocation,
  ApiDeviceInstallationRequest,
} from '../api';

interface PublicOperations {
  organizations: {
    get: (id: string) => Promise<ApiOrganization>;
  };
  devices: {
    get: (id: string) => Promise<ApiDevice>;
    getConfig: <T>(id: string) => Promise<T>;
    getLocation: (id: string) => Promise<ApiLocation>;
    install: (
      id: string,
      data: ApiDeviceInstallationRequest,
    ) => Promise<ApiDevice>;
  };
}

export const publicOperations = (
  opts: ViuApiClientOptions,
): PublicOperations => ({
  organizations: {
    get: async (id) =>
      await call<undefined, ApiOrganization>(
        'GET',
        `/public/organizations/${id}`,
        {
          ...opts,
          noAuth: true,
        },
      ),
  },
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
    getLocation: async (id: string) =>
      await call<undefined, ApiLocation>(
        'GET',
        `/public/devices/${id}/location`,
        {
          ...opts,
          noAuth: true,
        },
      ),
    install: async (id, data) =>
      await call<ApiDeviceInstallationRequest, ApiDevice>(
        'PUT',
        `/public/devices/${id}/install`,
        {
          ...opts,
          body: data,
          noAuth: true,
        },
      ),
  },
});
