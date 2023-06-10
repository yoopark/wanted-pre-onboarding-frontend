import { API_ROUTES } from '@/apis/constants/API_ROUTES';
import { apiJsonInstance } from '@/apis/utils';

export type SigninRequest = {
  email: string;
  password: string;
};

export type SigninResponse = {
  access_token: string; // data.access_token으로 와서 snake case로 표기
};

export const postSignin = (data: SigninRequest) => {
  return apiJsonInstance.post<SigninResponse>(API_ROUTES.SIGNIN, data);
};
