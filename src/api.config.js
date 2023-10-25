import axios from "axios";

const { REACT_APP_BASE_URL } = process.env;

export const instance = axios.create({
  withCredentials: true,
  baseURL: REACT_APP_BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    return config
  }
)

instance.interceptors.response.use(
  (config) => {
    return config;
  },

  async (error) => {
   const originalRequest = {...error.config};
   originalRequest._isRetry = true; 
    if (
      error.response.status === 401 && 
      error.config &&
      !error.config._isRetry
    ) {
      try {
        const resp = await instance.get("/Account/refresh");
        localStorage.setItem("token", resp.data.accessToken);
        return instance.request(originalRequest);
      } catch (error) {
        console.log("AUTH ERROR");
      }
    }
    throw error;
  }
);