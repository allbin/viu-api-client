import call from '../call';
import { DateTime } from 'luxon';

import type { ViuApiClientOptions } from '../options';

import type {
  ApiAttachment,
  ApiAttachmentPatchRequest,
  ApiAttachmentCategory,
} from '../api';

export interface ApiClientUploadFileMetadata {
  category: ApiAttachmentCategory;
  active_from: DateTime | undefined;
  active_to: DateTime | undefined;
}
export interface ApiClientUploadFile extends ApiClientUploadFileMetadata {
  file: File;
}

interface AttachmentOperations {
  list: (location_id?: string) => Promise<ApiAttachment[]>;
  create: (files: ApiClientUploadFile[]) => Promise<ApiAttachment[]>;
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
  create: async (files) => {
    const data = new FormData();
    const metadata = files.reduce<Record<string, ApiClientUploadFileMetadata>>(
      (meta, uf) => {
        const { category, active_from, active_to } = uf;
        meta[uf.file.name] = {
          category,
          active_from,
          active_to,
        };
        return meta;
      },
      {},
    );

    data.append('metadata', JSON.stringify(metadata));
    for (const uf of files) {
      data.append('files', uf.file);
    }

    return await call<undefined, ApiAttachment[]>('POST', `/attachments`, {
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
