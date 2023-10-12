import call from '../call';

import type { ViuApiClientOptions } from '../options';
import type {
  ApiOrganization,
  ApiAnnouncement,
  ApiApartment,
  ApiAttachment,
  ApiEmbeddedUrl,
  ApiDevice,
  ApiLocation,
  ApiDeviceInstallationRequest,
} from '@allbin/viu-types';

interface PublicOperations {
  organizations: {
    get: (id: string) => Promise<ApiOrganization>;
    getLocations: (id: string) => Promise<ApiLocation[]>;
  };
  devices: {
    get: (id: string) => Promise<ApiDevice>;
    getConfig: <T>(id: string) => Promise<T>;
    getLocation: (id: string) => Promise<ApiLocation>;
    getAnnouncements: (id: string) => Promise<ApiAnnouncement[]>;
    getApartments: (id: string) => Promise<ApiApartment[]>;
    getAttachments: (id: string) => Promise<ApiAttachment[]>;
    getEmbeddedUrls: (id: string) => Promise<ApiEmbeddedUrl[]>;
    install: (
      id: string,
      data: ApiDeviceInstallationRequest,
    ) => Promise<ApiDevice>;
  };
  // nametags: {};
  // tags: {};
  // locations: {};
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
    getLocations: async (id) =>
      await call<undefined, ApiLocation[]>(
        'GET',
        `/public/organizations/${id}/locations`,
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
    getApartments: async (id: string) =>
      await call<undefined, ApiApartment[]>(
        'GET',
        `public/devices/${id}/apartments`,
        {
          ...opts,
          noAuth: true,
        },
      ),
    getAnnouncements: async (id: string) =>
      await call<undefined, ApiAnnouncement[]>(
        'GET',
        `/public/devices/${id}/announcements`,
        {
          ...opts,
          noAuth: true,
        },
      ),
    getAttachments: async (id: string) =>
      await call<undefined, ApiAttachment[]>(
        'GET',
        `/public/devices/${id}/attachments`,
        {
          ...opts,
          noAuth: true,
        },
      ),
    getEmbeddedUrls: async (id: string) =>
      await call<undefined, ApiEmbeddedUrl[]>(
        'GET',
        `/public/devices/${id}/embedded-urls`,
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
