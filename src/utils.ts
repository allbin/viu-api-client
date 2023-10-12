import { ApiDeviceType } from '@allbin/viu-types';

export const makeDeviceId = (
  type: ApiDeviceType,
  hardware_id: string,
): string => [type.toLowerCase(), hardware_id].join('-');
