import * as ReactDOM from 'react-dom/client';

import { Home } from './pages/home/home';
import { StrictMode } from 'react';
import { UsersProvider } from './context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <UsersProvider>
      <Home />
    </UsersProvider>
  </StrictMode>
);
