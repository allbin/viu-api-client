# viu-dms-api-client

### Example use
```typescript
import { ViuDmsApiClient } from '@allbin/viu-dms-api-client';

const client = ViuDmsApiClient({
  baseUrl: 'https://api.viu-dms.dev.allbin.se',
  token: () => getTokenPromise(),
});

const devices = await client.devices.list();
```


### Generate new types from viu-dms-api

Adjust path to api.d.ts to fit your own machine

```cat ../viu-dms-api/src/types/api.d.ts | sed -e 's/^type/export type/g' > src/api.ts```
