import call from '../call';

import type { ViuApiClientOptions } from '../options';

import type { ApiImageUploadResponse } from '@allbin/viu-types';

interface ImageOperations {
  create: (files: File[]) => Promise<ApiImageUploadResponse[]>;
}

export const imageOperations = (
  opts: ViuApiClientOptions,
): ImageOperations => ({
  create: async (files) => {
    const data = new FormData();

    for (const f of files) {
      data.append('files', f);
    }

    return await call<undefined, ApiImageUploadResponse[]>('POST', `/images`, {
      ...opts,
      form: data,
    });
  },
});
