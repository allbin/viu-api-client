import call from '../call';

import type { ViuDmsClientOptions } from '../options';
import type { ApiOrganization } from '../api';

interface OrganizationOperations {
  list: () => Promise<ApiOrganization[]>;
}

export const organizationOperations = (
  opts: ViuDmsClientOptions,
): OrganizationOperations => ({
  list: async () =>
    await call<undefined, ApiOrganization[]>('GET', `/organizations`, {
      ...opts,
    }),
});
