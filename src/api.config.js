import axios from "axios";

const { REACT_APP_BASE_URL } = process.env;

export const instance = axios.create({
  withCredentials: true,
  baseURL: REACT_APP_BASE_URL,
});

let isRefreshing = false; // Flag to track if refresh token request is in progress
let refreshSubscribers = []; // Array to hold all the subscribers waiting for the token refresh

const subscribeTokenRefresh = (cb) =>
{
  refreshSubscribers.push(cb);
};

const onTokenRefreshed = (token) =>
{
  refreshSubscribers.map((cb) => cb(token));
};

instance.interceptors.request.use((config) =>
{
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

instance.interceptors.response.use(
  (response) =>
  {
    return response;
  },
  async (error) =>
  {
    const originalRequest = { ...error.config };
    originalRequest._isRetry = true;

    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    )
    {
      if (!isRefreshing)
      {
        isRefreshing = true;

        try
        {
          const accessToken = localStorage.getItem("token");
          const resp = await instance.post(
            `${REACT_APP_BASE_URL}/Account/refresh`,
            null,
            {
              params: {
                accessToken: accessToken,
              },
              withCredentials: true,
            }
          );

          localStorage.setItem("token", resp.data);
          onTokenRefreshed(resp.data);
          refreshSubscribers = [];
          isRefreshing = false;
          return instance.request(originalRequest);
        } catch (error)
        {
          console.log("AUTH ERROR");
        }
      } else
      {
        return new Promise((resolve) =>
        {
          subscribeTokenRefresh((token) =>
          {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(instance.request(originalRequest));
          });
        });
      }
    }
    throw error;
  }
);
