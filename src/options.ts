type AcquireTokenFunction = () => Promise<string>;

export interface ViuDmsClientOptions {
  baseUrl: string;
  token?: string | AcquireTokenFunction;
}
