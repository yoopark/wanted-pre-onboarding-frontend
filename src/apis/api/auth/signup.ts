import { API_ROUTES } from '@/apis/constants/API_ROUTES';
import { apiInstance } from '@/apis/instance';

export type SignupRequest = {
  email: string;
  password: string;
};

export type SignupResponse = void;

export const signup = (data: SignupRequest) => {
  return apiInstance.post<void>(API_ROUTES.SIGNUP, data);
};
