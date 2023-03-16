import { AxiosInstance } from 'axios';

type AcquireTokenFunction = () => Promise<string>;

export interface ViuApiClientOptions {
  axios?: AxiosInstance;
  baseUrl: string;
  apiKey?: string;
  token?: string | AcquireTokenFunction;
}
