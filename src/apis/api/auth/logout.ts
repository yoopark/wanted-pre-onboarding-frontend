import { removeAccessToken } from '@/utils/localStorage';

// 로그아웃 API가 없어서 localStorage에 저장된 토큰을 삭제하는 로직만 구현합니다.
export const logout = () => {
  removeAccessToken();
};
