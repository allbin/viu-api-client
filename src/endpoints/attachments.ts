import call from '../call';

import type { ViuApiClientOptions } from '../options';

import type {
  ApiAttachment,
  ApiAttachmentRequest,
  ApiAttachmentPatchRequest,
} from '../api';

interface AttachmentOperations {
  list: (location_id?: string) => Promise<ApiAttachment[]>;
  create: (attachment: ApiAttachmentRequest) => Promise<ApiAttachment>;
  patch: (
    id: string,
    attachment: ApiAttachmentPatchRequest,
  ) => Promise<ApiAttachment>;
  delete: (id: string) => Promise<ApiAttachment>;
}

export const attachmentOperations = (
  opts: ViuApiClientOptions,
): AttachmentOperations => ({
  list: async (location_id) =>
    await call<undefined, ApiAttachment[]>('GET', `/attachments`, {
      ...opts,
      ...(location_id ? { params: { location_id } } : {}),
    }),
  create: async (attachment) =>
    await call<ApiAttachmentRequest, ApiAttachment>('POST', `/attachments`, {
      ...opts,
      body: attachment,
    }),
  patch: async (id, attachment) =>
    await call<ApiAttachmentPatchRequest, ApiAttachment>(
      'PATCH',
      `/attachments/${id}`,
      {
        ...opts,
        body: attachment,
      },
    ),
  delete: async (id) =>
    await call<undefined, ApiAttachment>('DELETE', `/attachments/${id}`, {
      ...opts,
    }),
});
