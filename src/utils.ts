import { ApiDeviceType } from './api';

interface Utils {
  makeDeviceId: (type: ApiDeviceType, hardware_id: string) => string;
}

export const utils = (): Utils => ({
  makeDeviceId: (type, hardware_id) =>
    [type.toLowerCase(), hardware_id].join('-'),
});
