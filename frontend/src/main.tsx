import ReactDOM from 'react-dom/client';
import './i18n';
import './index.css';

import { Provider } from 'react-redux';

import { store } from './store/store';
import { RootLayout } from './layout/RootLayout';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <RootLayout />
    </BrowserRouter>
  </Provider>
);
