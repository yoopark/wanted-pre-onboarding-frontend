import styled from '@emotion/styled';
import { LogoBtn } from './LogoBtn';

export const Header = () => {
  return (
    <Layout>
      <LogoBtn />
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 14rem;
`;
