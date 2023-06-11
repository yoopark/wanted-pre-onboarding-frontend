import { AuthGuard } from '@/components/guards/AuthGuard';
import { NoAuthGuard } from '@/components/guards/NoAuthGuard';
import { LandingLayout } from '@/components/layouts/LandingLayout';
import NotFoundPage from '@/pages/Error/404';
import LandingPage from '@/pages/LandingPage';
import SigninPage from '@/pages/SigninPage';
import SignupPage from '@/pages/SignupPage';
import TodoPage from '@/pages/TodoPage';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from './ROUTES';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<LandingLayout />}>
        <Route path={ROUTES.ROOT} element={<LandingPage />} />
        <Route element={<NoAuthGuard />}>
          <Route path={ROUTES.SIGNIN} element={<SigninPage />} />
          <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
        </Route>
      </Route>
      <Route element={<AuthGuard />}>
        <Route path={ROUTES.TODO} element={<TodoPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
