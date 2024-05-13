import call from '../call';
import { type ViuApiClientOptions } from '../options';

import type { ApiServiceTag, ApiServiceTagRequest } from '@allbin/viu-types';

interface ServiceTagOperations {
  list: () => Promise<ApiServiceTag[]>;
  create: (service_tag: ApiServiceTagRequest) => Promise<ApiServiceTag>;
  update: (
    id: string,
    service_tag: ApiServiceTagRequest,
  ) => Promise<ApiServiceTag>;
  delete: (id: string) => Promise<ApiServiceTag>;
}

export const serviceTagOperations = (
  opts: ViuApiClientOptions,
): ServiceTagOperations => ({
  list: async () =>
    await call<undefined, ApiServiceTag[]>('GET', '/service-tags', opts),
  create: async (service_tag) =>
    await call<ApiServiceTagRequest, ApiServiceTag>('POST', '/service-tags', {
      ...opts,
      body: service_tag,
    }),
  update: async (id, service_tag) =>
    await call<ApiServiceTagRequest, ApiServiceTag>(
      'PUT',
      `/service-tags/${id}`,
      {
        ...opts,
        body: service_tag,
      },
    ),
  delete: async (id) =>
    await call<undefined, ApiServiceTag>('DELETE', `/service-tags/${id}`, opts),
});
