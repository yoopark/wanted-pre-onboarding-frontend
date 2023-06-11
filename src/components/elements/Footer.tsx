import styled from '@emotion/styled';

export const Footer = () => {
  return (
    <Layout>
      <p>ⓒ 2023. yongjun park</p>
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 8rem;
`;
