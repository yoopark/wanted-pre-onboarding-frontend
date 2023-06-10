import axios from 'axios';
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

const axiosAuthApi = (url: string, headers: { [key: string]: string } = {}) => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);

  if (token === null) {
    throw new Error('no access token in local storage');
  }
  const instance = axiosApi(url, {
    ...headers,
    Authorization: `Bearer ${token}`,
  });
  return instance;
};

const axiosAuthJsonApi = (
  url: string,
  headers: { [key: string]: string } = {},
) => {
  const instance = axiosAuthApi(url, {
    ...headers,
    'Content-Type': 'application/json',
  });
  return instance;
};

export const apiInstance = axiosApi(BASE_URL);
export const apiJsonInstance = axiosJsonApi(BASE_URL);
export const apiAuthInstance = axiosAuthApi(BASE_URL);
export const apiAuthJsonInstance = axiosAuthJsonApi(BASE_URL);
