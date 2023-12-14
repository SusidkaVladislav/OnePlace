import axios from "axios";
const { REACT_APP_BASE_URL } = process.env;


export const instance = axios.create({
  withCredentials: true,
  baseURL: REACT_APP_BASE_URL,
});


let isRefreshing = false;
let refreshSubscribers = [];

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
  config.headers.Authorization = `Bearer ${localStorage.getItem("access-token")}`;
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

    if (error.response.status === 401 && !originalRequest._isRetry)
    {
      if (!isRefreshing)
      {
        isRefreshing = true;

        try
        {
          const accessToken = localStorage.getItem("access-token");

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
          onTokenRefreshed(resp.data);
          refreshSubscribers = [];
          isRefreshing = false;

          return instance.request(originalRequest);
        } 
        catch (error)
        {
          localStorage.clear();
          localStorage.removeItem('persist:adminProduct');
          localStorage.removeItem('persist:root');
          window.location.reload();
        }
      } 
      else
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
    else if (error.response.status === 400)
    {
      return Promise.reject(error);
    }

    throw error;
  }
);



// import axios from "axios";
// const { REACT_APP_BASE_URL } = process.env;

// export const instance = axios.create({
//   withCredentials: true,
//   baseURL: REACT_APP_BASE_URL,
// });


// instance.interceptors.request.use(
//   (config) =>
//   {
//     config.headers.Authorization = `Bearer ${localStorage.getItem("access-token")}`
//     return config
//   }
// )


// instance.interceptors.response.use(
//   // в случае валидного accessToken ничего не делаем:
//   (config) =>
//   {
//     return config;
//   },
//   // в случае просроченного accessToken пытаемся его обновить:
//   async (error) =>
//   {
//     const originalRequest = { ...error.config };
//     originalRequest._isRetry = true;
//     if (
//       error.response.status === 401 &&

//       error.config &&
//       !error.config._isRetry
//     )
//     {
//       try
//       {
//         const accessToken = localStorage.getItem("access-token");
//         if (accessToken != null)
//         {
//           const resp = await axios.post(
//             `${REACT_APP_BASE_URL}/Account/refresh`,
//             null,
//             {
//               params: {
//                 accessToken: accessToken,
//               },
//             }
//           )

//           localStorage.setItem("access-token", resp.data.accessToken);
//           return instance.request(originalRequest);
//         }

//       } catch (error)
//       {
//         console.log(error)
//         console.log("AUTH ERROR");
//       }
//     }
//     throw error;
//   }
// );