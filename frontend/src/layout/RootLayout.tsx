import { Routes, Route } from 'react-router-dom';
import routes from '../routes';
import { useLanguageDir } from '../hooks/useLang';
import { useTheme } from '../hooks/useTheme';
import LayoutWrapper from './LayoutWrapper';
import MainNavbar from '../components/MainNavbar';
import AuthWrapper from '../wrappers/AuthWrapper';
import SystemModal from '../components/system/SystemModal';
import StoreLoader from '../components/system/StoreLoader';

export function RootLayout() {
  useLanguageDir();
  useTheme();

  return (
    <>
      <MainNavbar />
      <LayoutWrapper>
        <AuthWrapper>
          <SystemModal />
          <StoreLoader />
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} element={route.component} path={route.path} />
            ))}
          </Routes>
        </AuthWrapper>
      </LayoutWrapper>
    </>
  );
}
