import call from '../call';

import type { ViuApiClientOptions } from '../options';

import type {
  ApiAnnouncement,
  ApiAnnouncementRequest,
} from '@allbin/viu-types';

interface AnnouncementOperations {
  list: (location_id?: string) => Promise<ApiAnnouncement[]>;
  get: (id: string) => Promise<ApiAnnouncement>;
  create: (announcement: ApiAnnouncementRequest) => Promise<ApiAnnouncement>;
  update: (
    id: string,
    announcement: ApiAnnouncementRequest,
  ) => Promise<ApiAnnouncement>;
  delete: (id: string) => Promise<ApiAnnouncement>;
}

export const announcementOperations = (
  opts: ViuApiClientOptions,
): AnnouncementOperations => ({
  list: async (location_id) =>
    await call<undefined, ApiAnnouncement[]>('GET', `/announcements`, {
      ...opts,
      ...(location_id ? { params: { location_id } } : {}),
    }),
  get: async (id) =>
    await call<undefined, ApiAnnouncement>('GET', `/announcements/${id}`, {
      ...opts,
    }),
  create: async (announcement) =>
    await call<ApiAnnouncementRequest, ApiAnnouncement>(
      'POST',
      `/announcements`,
      { ...opts, body: announcement },
    ),
  update: async (id, announcement) =>
    await call<ApiAnnouncementRequest, ApiAnnouncement>(
      'PUT',
      `/announcements/${id}`,
      { ...opts, body: announcement },
    ),
  delete: async (id) =>
    await call<undefined, ApiAnnouncement>('DELETE', `/announcements/${id}`, {
      ...opts,
    }),
});
