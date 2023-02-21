0.20.0 - BREAKING CHANGES

  - Renamed: `viu-dms-api-client` is now just named `viu-api-client`.

  - public.devices.updateLocation() has been renamed to public.devices.install(),
    and its input arguments have been changed.

  - ApiDevice no longer contains a `location` property. Instead, it has a `location_id`
    referencing an ApiLocation, which is now its own endpoint. This means that one more
    request must be made for a device to retrieve information about its own state:

    The new process is

      `GET /public/devices/:id`
      `GET /public/devices/:id/config`

        followed by (if the device had a `location_id`):

      `GET /public/devices/:id/location`

  - ApiDevice no longer contains a `custom_fields` property. The only property existing
    in it was `landlord_info_uri` which is now its own type - ApiEmbeddedUrl. This new
    type references zero or more location_ids for which it is to be displayed.
