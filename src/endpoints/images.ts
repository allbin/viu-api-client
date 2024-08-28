import call from '../call';

import type { ViuApiClientOptions } from '../options';
import type { ApiClientUploadFile } from './attachments';

import type { ApiImageUploadResponse } from '@allbin/viu-types';

interface ImageOperations {
  create: (files: ApiClientUploadFile[]) => Promise<ApiImageUploadResponse[]>;
}

export const imageOperations = (
  opts: ViuApiClientOptions,
): ImageOperations => ({
  create: async (files) => {
    const data = new FormData();

    for (const uf of files) {
      data.append('files', uf.file);
    }

    return await call<undefined, ApiImageUploadResponse[]>('POST', `/images`, {
      ...opts,
      form: data,
    });
  },
});
