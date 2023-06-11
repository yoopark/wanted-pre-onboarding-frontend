import styled from '@emotion/styled';
import { SignupForm } from './SignupForm';

const SignupPage = () => {
  return (
    <Layout>
      <h1>회원가입</h1>
      <SignupForm />
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
