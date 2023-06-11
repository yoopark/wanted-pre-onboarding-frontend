import { ROUTES } from '@/routes/ROUTES';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const SigninMsg = () => {
  return (
    <Layout>
      <span>이미 계정이 있다면&nbsp;</span>
      <Link to={ROUTES.SIGNIN}>로그인</Link>
    </Layout>
  );
};

const Layout = styled.div``;
