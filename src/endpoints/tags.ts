import call from '../call';

import type { ViuApiClientOptions } from '../options';

import type { ApiTag } from '@allbin/viu-types';

interface TagOperations {
  list: () => Promise<ApiTag[]>;
  uninstall: (id: string) => Promise<void>;
}

export const tagOperations = (opts: ViuApiClientOptions): TagOperations => ({
  list: async () => {
    return await call<undefined, ApiTag[]>('GET', `/tags`, {
      ...opts,
    });
  },
  uninstall: async (id) => {
    return await call<undefined, void>('PUT', `/tags/${id}/uninstall`, {
      ...opts,
    });
  },
});
