import call from '../call';

import type { ViuApiClientOptions } from '../options';

import type { ApiTag } from '@allbin/viu-types';

interface TagOperations {
  list: () => Promise<ApiTag[]>;
}

export const tagOperations = (opts: ViuApiClientOptions): TagOperations => ({
  list: async () => {
    return await call<undefined, ApiTag[]>('GET', `/tags`, {
      ...opts,
    });
  },
});
