import { H1 } from '@/components/styled/H1';
import styled from '@emotion/styled';
import { SigninMsg } from './SigninMsg';
import { SignupForm } from './SignupForm';

const SignupPage = () => {
  return (
    <Layout>
      <H1>회원가입</H1>
      <SignupForm />
      <SigninMsg />
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
`;

export default SignupPage;
