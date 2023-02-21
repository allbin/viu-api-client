import call from '../call';

import type { ViuApiClientOptions } from '../options';
import type { ApiDeviceEvent, ApiDeviceEventQueryParams } from '../api';

interface DeviceEventOperations {
  query: (params: ApiDeviceEventQueryParams) => Promise<ApiDeviceEvent[]>;
}

export const deviceEventOperations = (
  opts: ViuApiClientOptions,
): DeviceEventOperations => ({
  query: async (params) => {
    return await call<undefined, ApiDeviceEvent[]>(
      'GET',
      `/device-events/query`,
      {
        ...opts,
        params,
      },
    );
  },
});
