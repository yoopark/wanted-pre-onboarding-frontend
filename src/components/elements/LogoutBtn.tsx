import { logout } from '@/apis/api/auth/logout';
import { ROUTES } from '@/routes/ROUTES';
import { useNavigate } from 'react-router-dom';

export const LogoutBtn = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    logout();
    navigate(ROUTES.ROOT);
  };
  return <button onClick={handleClick}>로그아웃</button>;
};
