export type ApiCoordinate = {
  /**
   * Coordinate Reference System
   */
  crs: 'WGS84' | 'EPSG:3021';
  /**
   * X-coordinate in CRS
   */
  x: number;
  /**
   * Y-coordinate in CRS
   */
  y: number;
};

export type ApiDeviceConfig = Record<string, boolean | number | string>;

export type ApiDeviceCreationEvent = {
  type: 'creation';
};

export type ApiDeviceDBRequest = {
  /**
   * Name of the device
   */
  name: string;
  /**
   * Name of the building or property the device is located in
   */
  site_name?: string;
  hardware_id: string;
  /**
   * Provider's ID for this device
   */
  source_id: string;
  organization_id: string;
  type: ApiDeviceType;
  state: ApiDeviceState;
} & ApiDeviceRequest;

export type ApiDeviceEventQueryParams = {
  /**
   * DeviceEvent ID
   */
  id?: string;
  /**
   * Device for which to retrieve events
   */
  device_id?: string;
  /**
   * Organization for which to retrieve events
   */
  organization_id?: string;
  /**
   * Start of time range for which to retrieve events
   */
  date_start?: string;
  /**
   * End of time range for which to retrieve events
   */
  date_end?: string;
  /**
   * Offset into query results to start returning from. No more than 1000 items will be returned per request.
   */
  offset?: number;
};

export type ApiDeviceEventRequest = {
  device_id: string;
} & (
  | ApiDeviceRebootEvent
  | ApiDeviceSoftwareStatusChangeEvent
  | ApiDeviceHardwareStatusChangeEvent
  | ApiDeviceCreationEvent
  | ApiDeviceInstallationEvent
  | ApiDeviceUninstallEvent
);

export type ApiDeviceEvent = {
  id: string;
  organization_id: string;
  meta: ApiMetadata;
} & ApiDeviceEventRequest;

export type ApiDeviceHardwareStatusChangeEvent = {
  type: 'status-change-hardware';
  data: ApiDeviceStatusChangeEventData;
};

export type ApiDeviceInstallationEventData = {
  location: ApiDeviceLocation;
};

export type ApiDeviceInstallationEvent = {
  type: 'installation';
  data: ApiDeviceInstallationEventData;
};

export type ApiDeviceLocation = {
  city: string;
  /**
   * Street address
   */
  address: string;
  placement?: string;
  coordinate?: ApiCoordinate;
  zipcode: string;
  /**
   * Property site name
   */
  site_name?: string;
};

export type ApiDeviceRebootEvent = {
  type: 'reboot';
};

export type ApiDeviceRequest = {
  location?: ApiDeviceLocation;
  /**
   * YYYY-MM-DD formatted date
   */
  license_expiry?: string;
  /**
   * YYYY-MM-DD formatted date
   */
  warranty_expiry?: string;
};

export type ApiDeviceSoftwareStatusChangeEvent = {
  type: 'status-change-software';
  data: ApiDeviceStatusChangeEventData;
};

export type ApiDeviceState = 'created' | 'installed';

export type ApiDeviceStatusChangeEventData = {
  online: boolean;
};

export type ApiDeviceStatus = {
  hardware_online: boolean;
  software_online: boolean;
  last_seen?: string;
};

export type ApiDevice = {
  id: string;
  meta: ApiMetadata;
  status: ApiDeviceStatus;
} & ApiDeviceDBRequest;

export type ApiDeviceType = 'eloview';

export type ApiDeviceUninstallEvent = {
  type: 'uninstall';
};

export type ApiError = {
  /**
   * Error message
   */
  message: string;
};

export type ApiMetadata = {
  /**
   * ISO 8601 date time
   */
  created_at: string;
  /**
   * Auth0 User ID
   */
  created_by: string;
  /**
   * ISO 8601 date time
   */
  updated_at: string;
  /**
   * ISO 8601 date time
   */
  deleted_at?: string;
  /**
   * Auth0 User ID
   */
  deleted_by?: string;
};

export type ApiOrganizationRequest = {
  name: string;
};

export type ApiOrganization = {
  id: string;
  meta: ApiMetadata;
} & ApiOrganizationRequest;

export type ApiParameterValidationError = {
  /**
   * Error message
   */
  msg: string;
  /**
   * Parameter descriptor
   */
  param: string;
  /**
   * Offending parameter value
   */
  value: string;
  /**
   * Offending parameter location
   */
  location: 'body' | 'query' | 'params' | 'cookies' | 'headers';
  nestedErrors?: Array<ApiParameterValidationError>;
};

export type ApiPermission =
  | 'devices:create'
  | 'devices:update'
  | 'devices:delete'
  | 'devices:factory-reset'
  | 'devices:uninstall'
  | 'users:read-all';

export type ApiProfile = Record<string, any>;

export type ApiUser = {
  /**
   * User ID
   */
  id: string;
  meta: ApiMetadata;
  /**
   * User full name
   */
  name: string;
  /**
   * User email
   */
  email: string;
};

export type ApiValidationError = ApiError & {
  errors?: Array<ApiParameterValidationError>;
};
