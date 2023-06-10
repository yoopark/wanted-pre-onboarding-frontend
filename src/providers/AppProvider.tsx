import { BrowserRouter as Router } from 'react-router-dom';

export const AppProvider = ({ children }: React.PropsWithChildren) => {
  return <Router>{children}</Router>;
};
