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

export type ApiDeviceCreationEvent = {
  type: 'creation';
};

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
  user_id: string;
  device_id: string;
} & (
  | ApiDeviceRebootEvent
  | ApiDeviceStatusChangeEvent
  | ApiDeviceCreationEvent
  | ApiDeviceInstallationEvent
);

export type ApiDeviceEvent = {
  id: string;
  organization_id: string;
  meta: ApiMetadata;
} & ApiDeviceRequest;

export type ApiDeviceInstallationEventData = {
  location: ApiDeviceLocation;
};

export type ApiDeviceInstallationEvent = {
  type: 'installation';
  data: ApiDeviceInstallationEventData;
};

export type ApiDeviceLocationPublicRequest = {
  city: string;
  /**
   * Street address
   */
  address: string;
  property_name?: string;
  placement: string;
};

export type ApiDeviceLocation = ApiDeviceLocationPublicRequest & {
  coordinate: ApiCoordinate;
};

export type ApiDeviceRebootEvent = {
  type: 'reboot';
};

export type ApiDeviceRequest = {
  hardware_id: string;
  /**
   * Provider's ID for this device
   */
  source_id: string;
  organization_id: string;
  type: ApiDeviceType;
  state: ApiDeviceState;
  location?: ApiDeviceLocation;
};

export type ApiDeviceState = 'created' | 'registered';

export type ApiDeviceStatusChangeEventData =
  | ApiDeviceStatusHwChangeData
  | ApiDeviceStatusSwChangeData
  | ApiDeviceStatusHwAndSwChangeData;

export type ApiDeviceStatusChangeEvent = {
  type: 'status-change';
  data: ApiDeviceStatusChangeEventData;
};

export type ApiDeviceStatusHwAndSwChangeData = {
  hw: ApiDeviceStatusValueTransition;
  sw: ApiDeviceStatusValueTransition;
};

export type ApiDeviceStatusHwChangeData = {
  hw: ApiDeviceStatusValueTransition;
};

export type ApiDeviceStatusSwChangeData = {
  sw: ApiDeviceStatusValueTransition;
};

export type ApiDeviceStatus = {
  hardware_online: boolean;
  software_online: boolean;
  last_seen?: string;
};

export type ApiDeviceStatusValueTransition = {
  from?: boolean;
  to: boolean;
};

export type ApiDevice = {
  id: string;
  meta: ApiMetadata;
} & ApiDeviceRequest &
  ApiDeviceStatus;

export type ApiDeviceType = 'eloview';

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
  | 'devices:delete';

export type ApiValidationError = ApiError & {
  errors?: Array<ApiParameterValidationError>;
};
