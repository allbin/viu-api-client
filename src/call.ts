import axios, { AxiosRequestConfig, Method } from 'axios';

import { ViuDmsClientOptions } from './options';

const call = async <R, T>(
  method: Method,
  url: string,
  opts: ViuDmsClientOptions & {
    body?: R;
    form?: FormData;
    responseType?: AxiosRequestConfig['responseType'];
    noAuth?: boolean;
  },
): Promise<T> => {
  const req: AxiosRequestConfig<R | FormData> = {
    method,
    headers: {},
    baseURL: opts.baseUrl,
  };
  const auth: AxiosRequestConfig['headers'] =
    !opts.noAuth && opts.token
      ? typeof opts.token === 'function'
        ? {
            Authorization: `Bearer ${await opts.token()}`,
          }
        : {
            Authorization: `Bearer ${opts.token}`,
          }
      : {};

  req.headers = {
    ...(opts.body ? { 'Content-Type': 'application/json' } : {}),
    ...auth,
    ...(opts.apiKey ? { 'x-api-key': opts.apiKey } : {}),
  };

  if (opts.responseType) {
    req.responseType = opts.responseType;
  }

  if (opts.form) {
    req.data = opts.form;
  } else if (opts.body) {
    req.data = opts.body;
  }

  return await axios.request<T>({ url, ...req }).then((r) => r.data);
};

export default call;
