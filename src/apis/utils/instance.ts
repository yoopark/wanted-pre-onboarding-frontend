import axios, { InternalAxiosRequestConfig } from 'axios';
import { ACCESS_TOKEN_KEY, BASE_URL } from '../constants';

const axiosApi = (url: string, headers: { [key: string]: string } = {}) => {
  const instance = axios.create({ baseURL: url, ...headers });
  return instance;
};

const axiosJsonApi = (url: string, headers: { [key: string]: string } = {}) => {
  const instance = axiosApi(url, {
    ...headers,
    'Content-Type': 'application/json',
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

export const apiJsonInstance = axiosJsonApi(BASE_URL);

export const apiAuthInstance = axiosApi(BASE_URL);
apiAuthInstance.interceptors.request.use(accessTokenInjector);

export const apiAuthJsonInstance = axiosJsonApi(BASE_URL);
apiAuthJsonInstance.interceptors.request.use(accessTokenInjector);
