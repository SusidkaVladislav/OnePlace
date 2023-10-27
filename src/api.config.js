import axios from "axios";

const { REACT_APP_BASE_URL } = process.env;

export const instance = axios.create({
  withCredentials: true,
  baseURL: REACT_APP_BASE_URL,
});

instance.interceptors.request.use(
  (config) =>
  {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    return config
  }
)

instance.interceptors.response.use(

  (config) =>
  {
    return config;
  },

  async (error) =>
  {
    const originalRequest = { ...error.config };
    originalRequest._isRetry = true;

    console.log(error)

    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry) 
    {
      try 
      {
        const accessToken = localStorage.getItem("token");
        const resp = await instance.post(REACT_APP_BASE_URL + "/Account/refresh", null, {
          params: {
            accessToken: accessToken
          },
          withCredentials: true
        });

        localStorage.setItem("token", resp.data);
        return instance.request(originalRequest);
      }
      catch (error)
      {
        console.log("AUTH ERROR");
      }
    }
    throw error;
  }
);