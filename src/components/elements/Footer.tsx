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
  font-size: 1.2rem;
  color: #767676;
  height: 14rem;
`;
