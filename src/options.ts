type AcquireTokenFunction = () => Promise<string>;

export interface ViuApiClientOptions {
  baseUrl: string;
  apiKey?: string;
  token?: string | AcquireTokenFunction;
}
