import call from '../call';

import type { ViuApiClientOptions } from '../options';

import type { ApiEmbeddedUrl, ApiEmbeddedUrlRequest } from '@allbin/viu-types';

interface EmbeddedUrlOperations {
  list: (location_id?: string) => Promise<ApiEmbeddedUrl[]>;
  get: (id: string) => Promise<ApiEmbeddedUrl>;
  create: (embedded_url: ApiEmbeddedUrlRequest) => Promise<ApiEmbeddedUrl>;
  update: (
    id: string,
    embedded_url: ApiEmbeddedUrlRequest,
  ) => Promise<ApiEmbeddedUrl>;
  delete: (id: string) => Promise<ApiEmbeddedUrl>;
}

export const embeddedUrlOperations = (
  opts: ViuApiClientOptions,
): EmbeddedUrlOperations => ({
  list: async (location_id) =>
    await call<undefined, ApiEmbeddedUrl[]>('GET', `/embedded-urls`, {
      ...opts,
      ...(location_id ? { params: { location_id } } : {}),
    }),
  get: async (id) =>
    await call<undefined, ApiEmbeddedUrl>('GET', `/embedded-urls/${id}`, {
      ...opts,
    }),
  create: async (embedded_url) =>
    await call<ApiEmbeddedUrlRequest, ApiEmbeddedUrl>(
      'POST',
      `/embedded-urls`,
      { ...opts, body: embedded_url },
    ),
  update: async (id, embedded_url) =>
    await call<ApiEmbeddedUrlRequest, ApiEmbeddedUrl>(
      'PUT',
      `/embedded-urls/${id}`,
      { ...opts, body: embedded_url },
    ),
  delete: async (id) =>
    await call<undefined, ApiEmbeddedUrl>('DELETE', `/embedded-urls/${id}`, {
      ...opts,
    }),
});
