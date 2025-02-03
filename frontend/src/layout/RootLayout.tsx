import { Routes, Route } from 'react-router-dom'
import routes from '../routes'
import { useLanguageDir } from '../hooks/useLang'
import { useTheme } from '../hooks/useTheme';
import MainLayout from './LayoutWrapper';
import MainNavbar from '../components/MainNavbar';
import AuthWrapper from '../wrappers/AuthWrapper';
import SystemModal from '../components/system/SystemModal';
import StoreLoader from '../components/system/StoreLoader';

export function RootLayout() {
    useLanguageDir()
    useTheme();

  return (
   <>
     <MainNavbar />
      <MainLayout>
      <AuthWrapper>
        <StoreLoader />
        <SystemModal />
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              element={route.component}
              path={route.path}
            />
          ))}
        </Routes>
        </AuthWrapper>
      </MainLayout>
    </>           

  )
}
