import call from '../call';

import type { ViuApiClientOptions } from '../options';
import type { ApiOrganization } from '@allbin/viu-types';

interface OrganizationOperations {
  list: () => Promise<ApiOrganization[]>;
  updateConfig: (
    id: string,
    config: ApiOrganization['config'],
  ) => Promise<ApiOrganization>;
}

export const organizationOperations = (
  opts: ViuApiClientOptions,
): OrganizationOperations => ({
  list: async () =>
    await call<undefined, ApiOrganization[]>('GET', `/organizations`, {
      ...opts,
    }),
  updateConfig: async (id, config) =>
    await call<ApiOrganization['config'], ApiOrganization>(
      'PUT',
      `/organizations/${id}/config`,
      {
        ...opts,
        body: config,
      },
    ),
});
