import { H1 } from '@/components/styled/H1';
import styled from '@emotion/styled';
import { SigninForm } from './SigninForm';
import { SignupMsg } from './SignupMsg';

const SigninPage = () => {
  return (
    <Layout>
      <H1>로그인</H1>
      <SigninForm />
      <SignupMsg />
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
`;

export default SigninPage;
