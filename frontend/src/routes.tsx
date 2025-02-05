import AuthPage from './pages/auth/AuthPage';
import MainPage from './pages/main/MainPage';

const routes = [
  {
    path: '/',
    component: <AuthPage />,
    label: 'auth-page',
  },
  {
    path: '/main',
    component: <MainPage />,
    label: 'main-page',
  },
];

export default routes;
