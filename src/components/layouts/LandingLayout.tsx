import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { LogoBtn } from '../elements/LogoBtn';

export const LandingLayout = () => {
  return (
    <Layout>
      <LogoBtn />
      <Outlet />
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
