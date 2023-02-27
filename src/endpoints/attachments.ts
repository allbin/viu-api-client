import call from '../call';

import type { ViuApiClientOptions } from '../options';

import type { ApiAttachment, ApiAttachmentPatchRequest } from '../api';

interface AttachmentOperations {
  list: (location_id?: string) => Promise<ApiAttachment[]>;
  create: (file: File) => Promise<ApiAttachment>;
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
  create: async (file) => {
    const data = new FormData();
    data.append('file', file);
    return await call<undefined, ApiAttachment>('POST', `/attachments`, {
      ...opts,
      form: data,
    });
  },

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
