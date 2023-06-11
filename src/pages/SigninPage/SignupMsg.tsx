import { ROUTES } from '@/routes/ROUTES';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const SignupMsg = () => {
  return (
    <Layout>
      <span>아직 계정이 없다면&nbsp;</span>
      <Link to={ROUTES.SIGNUP}>회원가입</Link>
    </Layout>
  );
};

const Layout = styled.div``;
