import { Route, Routes } from 'react-router-dom';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<p>landing page!! </p>} />
    </Routes>
  );
};
