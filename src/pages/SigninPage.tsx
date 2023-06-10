import { ROUTES } from '@/routes/ROUTES';
import { Link } from 'react-router-dom';

const SigninPage = () => {
  return (
    <>
      <h1>로그인</h1>
      <form>
        <input data-testid="email-input" />
        <input data-testid="password-input" />
        <button data-testid="signin-button">로그인</button>
      </form>
      <span>아직 계정이 없다면&nbsp;</span>
      <span>
        <Link to={ROUTES.SIGNUP}>회원가입</Link>
      </span>
    </>
  );
};

export default SigninPage;
