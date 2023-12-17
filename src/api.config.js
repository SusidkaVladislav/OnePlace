import axios from "axios";
const { REACT_APP_BASE_URL } = process.env;
export const instance = axios.create({
  withCredentials: true,
  baseURL: REACT_APP_BASE_URL,
});

instance.interceptors.request.use(config =>
{
  config.headers.Authorization = `Bearer ${localStorage.getItem("access-token")}`;
  return config;
});

instance.interceptors.response.use(
  response => response,
  async error =>
  {
    const originalRequest = { ...error.config };
    originalRequest._isRetry = true;
    if (error.response && error.response.status === 401 && error.config && !error.config._isRetry)
    {
      try
      {
        const accessToken = localStorage.getItem("access-token");
        if (accessToken !== null)
        {
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

          localStorage.setItem("access-token", resp.data);
          return instance.request(originalRequest);
        }
      } catch (error)
      {
        console.log("AUTH ERROR");
      }
    }
    throw error;
  }
);

