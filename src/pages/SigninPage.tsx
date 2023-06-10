import { ROUTES } from '@/routes/ROUTES';
import { Link } from 'react-router-dom';

const SigninPage = () => {
  return (
    <>
      <h1>로그인</h1>
      <span>아직 계정이 없다면&nbsp;</span>
      <span>
        <Link to={ROUTES.SIGNUP}>회원가입</Link>
      </span>
    </>
  );
};

export default SigninPage;
