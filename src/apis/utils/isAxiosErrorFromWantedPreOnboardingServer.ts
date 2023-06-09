import { isStringArrayType } from '@/utils/isStringArrayType';
import { isAxiosError } from 'axios';

type WantedPreOnboardingServerError = {
  message: string | string[];
  statusCode: number;
};

type AxiosErrorFromApi = {
  response: {
    data: WantedPreOnboardingServerError;
  };
};

const isWantedPreOnboardingFrontendServerError = (
  data: unknown,
): data is WantedPreOnboardingServerError => {
  if (typeof data !== 'object' || data === null) {
    return false;
  }
  if (!('message' in data) || !('statusCode' in data)) {
    return false;
  }
  if (
    (typeof data.message !== 'string' && !isStringArrayType(data.message)) ||
    typeof data.statusCode !== 'number'
  ) {
    return false;
  }
  return true;
};

export const isAxiosErrorFromWantedPreOnboardingServer = <Response>(
  error: unknown,
): error is AxiosErrorFromApi => {
  if (!isAxiosError<Response>(error)) {
    return false;
  }
  if (!('response' in error)) {
    return false;
  }
  if (
    typeof error.response !== 'object' ||
    error.response === null ||
    !('data' in error.response)
  ) {
    return false;
  }
  if (typeof error.response.data !== 'object' || error.response.data === null) {
    return false;
  }
  if (!isWantedPreOnboardingFrontendServerError(error.response.data)) {
    return false;
  }
  return true;
};
