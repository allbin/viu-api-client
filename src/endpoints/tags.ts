import call from '../call';

import type { ViuApiClientOptions } from '../options';

import type { ApiTag, ApiTagBase } from '@allbin/viu-types';

interface TagOperations {
  list: (location_id?: string) => Promise<ApiTag[]>;
  uninstall: (id: string) => Promise<ApiTagBase>;
}

export const tagOperations = (opts: ViuApiClientOptions): TagOperations => ({
  list: async (location_id) => {
    return await call<undefined, ApiTag[]>('GET', `/tags`, {
      ...opts,
      params: location_id ? { location_id } : {},
    });
  },
  uninstall: async (id) => {
    return await call<undefined, ApiTagBase>('PUT', `/tags/${id}/uninstall`, {
      ...opts,
    });
  },
});
