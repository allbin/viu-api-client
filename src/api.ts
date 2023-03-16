export type ApiAddress = {
  /**
   * Street address
   */
  street: string;
  zipcode: string;
  city: string;
};

export type ApiAnnouncementLinkedEvent = {
  type: 'announcement_linked';
  data: ApiAnnouncementLinkEventData;
};

export type ApiAnnouncementLinkEventData = {
  announcement_id: string;
};

export type ApiAnnouncementRequest = {
  message: string;
  location_ids: Array<string>;
  active_from?: string;
  active_to?: string;
};

export type ApiAnnouncement = ApiUuidEntity & ApiAnnouncementRequest;

export type ApiAnnouncementUnlinkedEvent = {
  type: 'announcement_unlinked';
  data: ApiAnnouncementLinkEventData;
};

export type ApiApartmentCreatedEvent = {
  type: 'apartment_created';
  data: ApiApartmentRequest;
};

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

export type ApiApartmentUpdatedEvent = {
  type: 'apartment_updated';
  data: ApiApartmentRequest;
};

export type ApiAttachmentCategory =
  | 'energy-declaration-ovk'
  | 'property-info'
  | 'other';

export type ApiAttachmentLinkedEvent = {
  type: 'attachment_linked';
  data: ApiAttachmentLinkEventData;
};

export type ApiAttachmentLinkEventData = {
  attachment_id: string;
};

export type ApiAttachmentPatchRequest = ApiAttachmentUploadMetadata & {
  /**
   * Displayed file name
   */
  name: string;
  location_ids: Array<string>;
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

export type ApiAttachmentUnlinkedEvent = {
  type: 'attachment_unlinked';
  data: ApiAttachmentLinkEventData;
};

export type ApiAttachmentUploadMetadata = {
  category: ApiAttachmentCategory;
  active_from?: string;
  active_to?: string;
};

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
   * References an ApiLocation object where the device is installed
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

export type ApiEmbeddedUrlLinkedEvent = {
  type: 'embedded_url_linked';
  data: ApiEmbeddedUrlLinkEventData;
};

export type ApiEmbeddedUrlLinkEventData = {
  embedded_url_id: string;
};

export type ApiEmbeddedUrlRequest = {
  name: string;
  url: string;
  location_ids: Array<string>;
  active_from?: string;
  active_to?: string;
};

export type ApiEmbeddedUrl = ApiUuidEntity & ApiEmbeddedUrlRequest;

export type ApiEmbeddedUrlUnlinkedEvent = {
  type: 'embedded_url_unlinked';
  data: ApiEmbeddedUrlLinkEventData;
};

export type ApiError = {
  /**
   * Error message
   */
  message: string;
};

export type ApiLocationCreatedEvent = {
  type: 'location_created';
  data: ApiLocationRequest;
};

export type ApiLocationDeletedEvent = {
  type: 'location_deleted';
};

export type ApiLocationDeviceEventData = {
  device_id: string;
};

export type ApiLocationDeviceInstalledEvent = {
  type: 'device_installed';
  data: ApiLocationDeviceEventData;
};

export type ApiLocationDeviceUninstalledEvent = {
  type: 'device_uninstalled';
  data: ApiLocationDeviceEventData;
};

export type ApiLocationEventRequest = {
  location_id: string;
} & (
  | ApiLocationDeviceInstalledEvent
  | ApiLocationDeviceUninstalledEvent
  | ApiLocationCreatedEvent
  | ApiLocationUpdatedEvent
  | ApiLocationDeletedEvent
  | ApiApartmentCreatedEvent
  | ApiApartmentUpdatedEvent
  | ApiAnnouncementLinkedEvent
  | ApiAnnouncementUnlinkedEvent
  | ApiAttachmentLinkedEvent
  | ApiAttachmentUnlinkedEvent
  | ApiEmbeddedUrlLinkedEvent
  | ApiEmbeddedUrlUnlinkedEvent
  | ApiTenantMovedInEvent
  | ApiTenantMovedOutEvent
);

export type ApiLocationEvent = ApiStringEntity & ApiLocationEventRequest;

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

export type ApiLocationUpdatedEvent = {
  type: 'location_updated';
  data: ApiLocationRequest;
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
  synchronized_types: Array<ApiSynchronizedType>;
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
  | 'announcements:create'
  | 'announcements:update'
  | 'announcements:delete'
  | 'apartments:create'
  | 'apartments:update'
  | 'apartments:delete'
  | 'attachments:create'
  | 'attachments:update'
  | 'attachments:delete'
  | 'devices:create'
  | 'devices:update'
  | 'devices:delete'
  | 'devices:factory-reset'
  | 'devices:uninstall'
  | 'embedded-urls:create'
  | 'embedded-urls:update'
  | 'embedded-urls:delete'
  | 'locations:create'
  | 'locations:update'
  | 'locations:delete'
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

export type ApiSynchronizedType =
  | 'announcements'
  | 'apartments'
  | 'attachments'
  | 'embedded-urls'
  | 'locations';

export type ApiTenantMovedEventData = {
  name: string;
};

export type ApiTenantMovedInEvent = {
  type: 'tenant_moved_in';
  data: ApiTenantMovedEventData;
};

export type ApiTenantMovedOutEvent = {
  type: 'tenant_moved_out';
  data: ApiTenantMovedEventData;
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
