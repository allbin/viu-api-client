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

export type ApiDeviceEvent = {
  id: string;
  organization_id: string;
  user_id: string;
  device_id: string;
  meta: ApiMetadata;
} & (ApiDeviceRebootEvent | ApiDeviceStatusChangeEvent);

export type ApiDeviceLocation = {
  city: string;
  /**
   * Street address
   */
  address: string;
  property_name?: string;
  placement: 'entrance' | 'laundry-room';
  coordinate: ApiCoordinate;
};

export type ApiDevicePatchLocationRequest = {
  location?: ApiDeviceLocation;
};

export type ApiDeviceRebootEvent = {
  type: 'reboot';
};

export type ApiDeviceRequest = {
  hardware_id: string;
  organization_id: string;
  type: ApiDeviceType;
  online?: boolean;
  state?: ApiDeviceState;
  location?: ApiDeviceLocation;
};

export type ApiDeviceState = 'created' | 'registered';

export type ApiDeviceStatusChangeEventData =
  | ApiDeviceStatusHwChangeData
  | ApiDeviceStatusSwChangeData
  | ApiDeviceStatusHwAndSwChangeData;

export type ApiDeviceStatusChangeEvent = {
  type: 'device-status-change';
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

export type ApiDeviceStatusValueTransition = {
  from?: boolean;
  to: boolean;
};

export type ApiDevice = {
  id: string;
  hardware_id: string;
  organization_id: string;
  meta: ApiMetadata;
  type: ApiDeviceType;
  state: ApiDeviceState;
  online: boolean;
  last_seen?: string;
  location?: ApiDeviceLocation;
};

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

export type ApiPermission = 'something:something';

export type ApiValidationError = ApiError & {
  errors?: Array<ApiParameterValidationError>;
};
