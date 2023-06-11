import { ROUTES } from '@/routes/ROUTES';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <>
      <Link to={ROUTES.SIGNIN}>시작하기</Link>
    </>
  );
};

export default LandingPage;
