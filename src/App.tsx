import { reset } from '@/styles/reset';
import { Global } from '@emotion/react';
import { AppProvider } from './providers/AppProvider';
import { AppRoutes } from './routes/AppRoutes';
import { global } from './styles/global';

function App() {
  return (
    <AppProvider>
      <Global styles={[reset, global]} />
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
