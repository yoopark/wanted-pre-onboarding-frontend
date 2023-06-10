import { ROUTES } from '@/routes/ROUTES';
import { getAccessToken } from '@/utils/localStorage';
import { Navigate, Outlet } from 'react-router-dom';

export const NoAuthGuard = () => {
  const isAuthenticated = getAccessToken() !== null; // FIXME: check if token is valid

  return !isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.TODO} />;
};
