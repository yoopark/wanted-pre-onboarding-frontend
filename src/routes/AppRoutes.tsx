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
      <Route
        path={ROUTES.TODO}
        element={
          <Suspense>
            <TodoPage />
          </Suspense>
        }
      />
    </Routes>
  );
};
