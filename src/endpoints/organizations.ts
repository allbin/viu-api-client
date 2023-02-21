import call from '../call';

import type { ViuApiClientOptions } from '../options';
import type { ApiOrganization } from '../api';

interface OrganizationOperations {
  list: () => Promise<ApiOrganization[]>;
}

export const organizationOperations = (
  opts: ViuApiClientOptions,
): OrganizationOperations => ({
  list: async () =>
    await call<undefined, ApiOrganization[]>('GET', `/organizations`, {
      ...opts,
    }),
});
