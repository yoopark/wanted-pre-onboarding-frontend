import logo from '@/assets/logo.png';
import { ROUTES } from '@/routes/ROUTES';
import { Link } from 'react-router-dom';

export const LogoBtn = () => {
  return (
    <Link to={ROUTES.ROOT}>
      <img src={logo} width="50px" />
    </Link>
  );
};
