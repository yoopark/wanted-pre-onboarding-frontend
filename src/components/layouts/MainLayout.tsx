import { Footer } from '@/components/elements/Footer';
import { Header } from '@/components/elements/Header';
import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

// 의미적인 구분을 위해 만들었지만, 사실 LandingLayout과 같습니다
export const MainLayout = () => {
  return (
    <Layout>
      <Header />
      <Outlet />
      <Footer />
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
