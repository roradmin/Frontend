import axios from 'axios';
import { getDataFromCookie } from '../components/common/miniComponents/cookieManage';
import envConfig from '../config';
const {baseUrl} = envConfig();

export const ApiInstance = (contentType = null) => {
  let axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 15000,
    headers: { 'content-type': contentType ?? 'application/json' }
  });
  axiosInstance.interceptors.request.use(
    config => {
      const userToken = getDataFromCookie('userToken');
      if (userToken) {
        config.headers['x-auth-token'] = userToken;
      }
      return config;
    },
    error => Promise.reject(error)
  );
  return axiosInstance;
}