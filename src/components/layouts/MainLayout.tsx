import { Footer } from '@/components/elements/Footer';
import { Header } from '@/components/elements/Header';
import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { glassmorphism } from './glassmorphism';

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
  max-width: 640px;
  margin: auto;
  padding: 0 1rem;
  min-height: 100vh;
  ${glassmorphism}
`;
