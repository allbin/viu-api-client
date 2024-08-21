import call from '../call';

import type { ViuApiClientOptions } from '../options';
import type {
  ApiOrganization,
  ApiAnnouncement,
  ApiAttachment,
  ApiEmbeddedUrl,
  ApiDevice,
  ApiLocation,
  ApiDeviceInstallationRequest,
  ApiNameTagInstallationRequest,
  ApiResult,
  ApiBookingTagInstallationRequest,
  ApiBookingTagResource,
  ApiPublicConnector,
  ApiBookingTagEvent,
  ApiFloor,
  ApiUnit,
  ApiPublicUnit,
} from '@allbin/viu-types';

interface PublicOperations {
  organizations: {
    get: (id: string) => Promise<ApiOrganization>;
    getLocations: (id: string) => Promise<ApiLocation[]>;
    getConnectors: (id: string) => Promise<ApiPublicConnector[]>;
  };
  devices: {
    get: (id: string) => Promise<ApiDevice>;
    getConfig: <T>(id: string) => Promise<T>;
    getLocation: (id: string) => Promise<ApiLocation>;
    getAnnouncements: (id: string) => Promise<ApiAnnouncement[]>;
    getFloors: (id: string) => Promise<ApiFloor[]>;
    getUnits: (id: string) => Promise<ApiUnit[]>;
    getAttachments: (id: string) => Promise<ApiAttachment[]>;
    getEmbeddedUrls: (id: string) => Promise<ApiEmbeddedUrl[]>;
    install: (
      id: string,
      data: ApiDeviceInstallationRequest,
    ) => Promise<ApiDevice>;
  };
  nametags: {
    install: (id: string, data: ApiNameTagInstallationRequest) => Promise<void>;
  };
  bookingtags: {
    install: (
      id: string,
      data: ApiBookingTagInstallationRequest,
    ) => Promise<void>;
  };
  connectors: {
    getResources: (
      id: string,
      timezone?: string,
    ) => Promise<ApiBookingTagResource[]>;
    getResourceBookings: (
      connector_id: string,
      resource_source_id: string,
    ) => Promise<ApiBookingTagEvent[]>;
  };
  tags: {
    getLocations: (id: string) => Promise<ApiLocation[]>;
    isInstalled: (id: string) => Promise<boolean>;
    getConnectors: (id: string) => Promise<ApiPublicConnector[]>;
    scan: (id: string) => Promise<void>;
  };
  locations: {
    getFloors: (id: string) => Promise<ApiFloor[]>;
    getUnits: (id: string) => Promise<ApiPublicUnit[]>;
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
    getLocations: async (id) =>
      await call<undefined, ApiLocation[]>(
        'GET',
        `/public/organizations/${id}/locations`,
        {
          ...opts,
          noAuth: true,
        },
      ),
    getConnectors: async (id) =>
      await call<undefined, ApiPublicConnector[]>(
        'GET',
        `/public/organizations/${id}/connectors`,
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
    getFloors: async (id: string) =>
      await call<undefined, ApiFloor[]>('GET', `/public/devices/${id}/floors`, {
        ...opts,
        noAuth: true,
      }),
    getUnits: async (id: string) =>
      await call<undefined, ApiUnit[]>('GET', `/public/devices/${id}/units`, {
        ...opts,
        noAuth: true,
      }),
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
  nametags: {
    install: async (id, data) =>
      await call<ApiNameTagInstallationRequest, void>(
        'PATCH',
        `/public/nametags/${id}/install`,
        {
          ...opts,
          body: data,
          noAuth: true,
        },
      ),
  },
  bookingtags: {
    install: async (id, data) =>
      await call<ApiBookingTagInstallationRequest, void>(
        'PATCH',
        `/public/bookingtags/${id}/install`,
        {
          ...opts,
          body: data,
          noAuth: true,
        },
      ),
  },
  connectors: {
    getResources: async (id, timezone) =>
      await call<undefined, ApiBookingTagResource[]>(
        'GET',
        `/public/connectors/${id}/resources`,
        {
          ...opts,
          params: timezone ? { timezone } : {},
          noAuth: true,
        },
      ),
    getResourceBookings: async (connector_id, resource_source_id) =>
      await call<undefined, ApiBookingTagEvent[]>(
        'GET',
        `/public/connectors/${connector_id}/resources/${resource_source_id}/bookings`,
        {
          ...opts,
          noAuth: true,
        },
      ),
  },
  tags: {
    getLocations: async (id) =>
      await call<undefined, ApiLocation[]>(
        'GET',
        `/public/tags/${id}/locations`,
        {
          ...opts,
          noAuth: true,
        },
      ),
    getConnectors: async (id) =>
      await call<undefined, ApiPublicConnector[]>(
        'GET',
        `/public/tags/${id}/connectors`,
        {
          ...opts,
          noAuth: true,
        },
      ),
    isInstalled: async (id) => {
      return (
        await call<undefined, ApiResult>(
          'GET',
          `/public/tags/${id}/is-installed`,
          {
            ...opts,
            noAuth: true,
          },
        )
      ).result;
    },
    scan: async (id) => {
      return await call<undefined, void>('GET', `/public/tags/scan`, {
        ...opts,
        params: { id },
        noAuth: true,
      });
    },
  },
  locations: {
    getFloors: async (id) =>
      await call<undefined, ApiFloor[]>(
        'GET',
        `/public/locations/${id}/floors`,
        {
          ...opts,
          noAuth: true,
        },
      ),
    getUnits: async (id) =>
      await call<undefined, ApiPublicUnit[]>(
        'GET',
        `/public/locations/${id}/units`,
        {
          ...opts,
          noAuth: true,
        },
      ),
  },
});
