import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/elements/Header';
import { Footer } from '@/components/elements/Footer';

export const LandingLayout = () => {
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
