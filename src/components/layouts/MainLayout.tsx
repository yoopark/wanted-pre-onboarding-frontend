import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { Header } from '../elements/Header';

// 의미적인 구분을 위해 만들었지만, 사실 LandingLayout과 같습니다
export const MainLayout = () => {
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
