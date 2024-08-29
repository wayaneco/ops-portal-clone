const BASE_URL = process.env["NEXT_PUBLIC_APP_BASE_URL"];

const api = {
  get: (
    url: string,
    params: {
      headers: HeadersInit;
      body?: string;
      cache?: RequestCache;
      next?: NextFetchRequestConfig;
    }
  ) =>
    fetch(`${BASE_URL}${url}`, {
      method: "GET",
      ...params,
    }),
};

export default api;
