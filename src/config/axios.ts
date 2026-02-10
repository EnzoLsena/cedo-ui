import axios from "axios";

export const urlBase = "https://api.cedodoceria.com/";
// export const urlBase = "http//:localhost:3000";

const axiosInstance = axios.create({ baseURL: urlBase });

axiosInstance.interceptors.request.use((context) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) context.headers.Authorization = `Bearer ${accessToken}`;
  return context;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
