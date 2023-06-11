import styled from '@emotion/styled';
import { SigninForm } from './SigninForm';
import { SignupMsg } from './SignupMsg';

const SigninPage = () => {
  return (
    <Layout>
      <h1>로그인</h1>
      <SigninForm />
      <SignupMsg />
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
`;

export default SigninPage;
