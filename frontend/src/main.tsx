import ReactDOM from 'react-dom/client';
import './i18n';
import './index.css';

import { Provider } from 'react-redux';

import { store } from './store/store';
import { RootLayout } from './layout/RootLayout';
import { BrowserRouter } from 'react-router-dom';
import AuthWrapper from './layout/AuthWrapper';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
      <BrowserRouter>
        <AuthWrapper>
          <RootLayout />
        </AuthWrapper>
      </BrowserRouter>
    </Provider>
);
