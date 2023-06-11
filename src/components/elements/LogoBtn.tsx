import logo from '@/assets/logo.png';
import { ROUTES } from '@/routes/ROUTES';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const LogoBtn = () => {
  return (
    <Layout>
      <Link to={ROUTES.ROOT}>
        <img src={logo} width="50px" />
      </Link>
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 8rem;
`;
