import { Footer } from '@/components/elements/Footer';
import { Header } from '@/components/elements/Header';
import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

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
  max-width: 640px;
  margin: auto;
  padding: 0 1rem;
  min-height: 100vh;
  background-color: #ffffff;
`;
