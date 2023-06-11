import { API_ROUTES } from '@/apis/constants/API_ROUTES';
import { apiJsonInstance } from '@/apis/utils';

export type SignupRequest = {
  email: string;
  password: string;
};

export type SignupResponse = void;

export const signup = (data: SignupRequest) => {
  return apiJsonInstance.post<void>(API_ROUTES.SIGNUP, data);
};
