import { API_ROUTES } from '@/apis/constants/API_ROUTES';
import { apiJsonInstance } from '@/apis/utils';

export interface SignupRequest {
  email: string;
  password: string;
}

export const postSignup = (data: SignupRequest) => {
  return apiJsonInstance.post<void>(API_ROUTES.SIGNUP, data);
};
