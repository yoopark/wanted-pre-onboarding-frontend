import { AuthGuard } from '@/components/guards/AuthGuard';
import { NoAuthGuard } from '@/components/guards/NoAuthGuard';
import NotFoundPage from '@/pages/404';
import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from './ROUTES';

const LandingPage = lazy(() => import('@/pages/LandingPage'));
const SigninPage = lazy(() => import('@/pages/SigninPage'));
const SignupPage = lazy(() => import('@/pages/SignupPage'));
const TodoPage = lazy(() => import('@/pages/TodoPage'));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path={ROUTES.ROOT}
        element={
          <Suspense>
            <LandingPage />
          </Suspense>
        }
      />
      <Route element={<NoAuthGuard />}>
        <Route
          path={ROUTES.SIGNIN}
          element={
            <Suspense>
              <SigninPage />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.SIGNUP}
          element={
            <Suspense>
              <SignupPage />
            </Suspense>
          }
        />
      </Route>
      <Route element={<AuthGuard />}>
        <Route
          path={ROUTES.TODO}
          element={
            <Suspense>
              <TodoPage />
            </Suspense>
          }
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
