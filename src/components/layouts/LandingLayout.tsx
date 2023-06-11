import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { Header } from '../elements/Header';

export const LandingLayout = () => {
  return (
    <Layout>
      <Header />
      <Outlet />
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
