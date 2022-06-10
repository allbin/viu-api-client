import { ApiDeviceType } from './api';

export const makeDeviceId = (
  type: ApiDeviceType,
  hardware_id: string,
): string => [type.toLowerCase(), hardware_id].join('-');
