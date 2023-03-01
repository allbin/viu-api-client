export type ApiAddress = {
  /**
   * Street address
   */
  street: string;
  zipcode: string;
  city: string;
};

export type ApiAnnouncementRequest = {
  message: string;
  location_ids: Array<string>;
  active_from?: string;
  active_to?: string;
};

export type ApiAnnouncement = ApiUuidEntity & ApiAnnouncementRequest;

export type ApiApartmentRequest = {
  /**
   * References an ApiLocation
   */
  location_id: string;
  /**
   * Unit identifier
   */
  unit: string;
  /**
   * Floor number
   */
  floor: number;
  tenants: Array<ApiTenant>;
  /**
   * Provider's ID for this device
   */
  source_id?: string;
};

export type ApiApartment = ApiUuidEntity & ApiApartmentRequest;

export type ApiAttachmentCategory =
  | 'energy-declaration-ovk'
  | 'property-info'
  | 'other';

export type ApiAttachmentPatchRequest = {
  /**
   * Displayed file name
   */
  name: string;
  category: ApiAttachmentCategory;
  location_ids: Array<string>;
  active_from?: string;
  active_to?: string;
};

export type ApiAttachmentRequest = ApiAttachmentPatchRequest & {
  /**
   * SHA256 hash of the file contents. Used as filename in the storage bucket.
   */
  content_hash: string;
  /**
   * MIME-type
   */
  mime_type: string;
};

export type ApiAttachment = ApiUuidEntity & ApiAttachmentRequest;

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
  hardware_id: string;
  /**
   * Provider's ID for this device
   */
  source_id: string;
  organization_id: string;
  type: ApiDeviceType;
  state: ApiDeviceState;
  /**
   * Specfic device placement within the location
   */
  placement?: string;
  /**
   * References an ApiLocation where the device is installed
   */
  location_id?: string;
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

export type ApiDeviceEvent = ApiStringEntity &
  ApiDeviceEventRequest & {
    organization_id: string;
  };

export type ApiDeviceHardwareStatusChangeEvent = {
  type: 'status-change-hardware';
  data: ApiDeviceStatusChangeEventData;
};

export type ApiDeviceInstallationEventData = {
  location: ApiLocation;
};

export type ApiDeviceInstallationEvent = {
  type: 'installation';
  data: ApiDeviceInstallationEventData;
};

export type ApiDeviceInstallationRequest = {
  location_id: string;
  /**
   * Specific place within the location where the device is installed
   */
  placement: string;
};

export type ApiDeviceRebootEvent = {
  type: 'reboot';
};

export type ApiDeviceRequest = {
  /**
   * References an ApiLocation object
   */
  location_id?: string;
  /**
   * Specific place within the location where the device is installed
   */
  placement?: string;
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

export type ApiDevice = ApiStringEntity &
  ApiDeviceDBRequest & {
    status: ApiDeviceStatus;
  };

export type ApiDeviceType = 'eloview';

export type ApiDeviceUninstallEvent = {
  type: 'uninstall';
};

export type ApiEmbeddedUrlRequest = {
  name: string;
  url: string;
  location_ids: Array<string>;
  active_from?: string;
  active_to?: string;
};

export type ApiEmbeddedUrl = ApiUuidEntity & ApiEmbeddedUrlRequest;

export type ApiError = {
  /**
   * Error message
   */
  message: string;
};

export type ApiLocationRequest = ApiAddress & {
  /**
   * Provider ID for this location
   */
  source_id?: string;
  /**
   * Property site name
   */
  site_name?: string;
  coordinate?: ApiCoordinate;
};

export type ApiLocation = ApiUuidEntity & ApiLocationRequest;

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

export type ApiOrganization = ApiStringEntity & ApiOrganizationRequest;

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

export type ApiStringEntity = {
  /**
   * Identifier
   */
  id: string;
  meta: ApiMetadata;
  organization_id: string;
};

export type ApiTenant = {
  id: string;
  first_name: string;
  last_name?: string;
  active_from?: string;
  active_to?: string;
};

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

export type ApiUuidEntity = {
  /**
   * Identifier
   */
  id: string;
  meta: ApiMetadata;
  organization_id: string;
};

export type ApiValidationError = ApiError & {
  errors?: Array<ApiParameterValidationError>;
};
