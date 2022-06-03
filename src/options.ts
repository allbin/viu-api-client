type AcquireTokenFunction = () => Promise<string>;

export interface ViuDmsClientOptions {
  baseUrl: string;
  apiKey?: string;
  token?: string | AcquireTokenFunction;
}
