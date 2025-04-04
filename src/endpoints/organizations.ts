import call from '../call';

import type { ViuApiClientOptions } from '../options';
import type { ApiOrganization } from '@allbin/viu-types';

interface OrganizationOperations {
  list: () => Promise<ApiOrganization[]>;
  updateConfig: (
    id: string,
    config: ApiOrganization['config'],
  ) => Promise<ApiOrganization>;
  updateLicenseNotificationSubscribers: (
    license_notification_subscribers: string[],
  ) => Promise<ApiOrganization>;
  updateAlertNotificationSubscribers: (
    alert_notification_subscribers: string[],
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
  updateLicenseNotificationSubscribers: async (
    license_notification_subscribers,
  ) =>
    await call<string[], ApiOrganization>(
      'PATCH',
      `/organizations/license-notification-subscribers`,
      {
        ...opts,
        body: license_notification_subscribers,
      },
    ),
  updateAlertNotificationSubscribers: async (alert_notification_subscribers) =>
    await call<string[], ApiOrganization>(
      'PATCH',
      `/organizations/alert-notification-subscribers`,
      {
        ...opts,
        body: alert_notification_subscribers,
      },
    ),
});
