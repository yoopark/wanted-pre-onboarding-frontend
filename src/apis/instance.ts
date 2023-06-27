import axios, { InternalAxiosRequestConfig } from 'axios';
import { ACCESS_TOKEN_KEY, BASE_URL } from './constants';

const axiosApi = (url: string, headers: { [key: string]: string } = {}) => {
  const instance = axios.create({
    baseURL: url,
    headers: { ...headers, 'Content-Type': 'application/json' },
  });
  return instance;
};

const accessTokenInjector = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);

  if (token === null) {
    throw new Error('no access token in local storage');
  }
  config.headers.Authorization = `Bearer ${token}`;
  return config;
};

export const apiInstance = axiosApi(BASE_URL);

export const apiAuthInstance = axiosApi(BASE_URL);
apiAuthInstance.interceptors.request.use(accessTokenInjector);
