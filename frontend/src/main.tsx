import ReactDOM from 'react-dom/client';
import './i18n';
import './index.css';

import App from './App';
import { Provider } from 'react-redux';

import { store } from './store/store';
import { useLanguageDir } from './hooks/useLang';

const Root = () => {
  useLanguageDir();
  return <App />;
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
      <Root />
    </Provider>
);
