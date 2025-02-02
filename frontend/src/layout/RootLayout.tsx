import { Routes, Route } from 'react-router-dom'
import routes from '../routes'
import { useLanguageDir } from '../hooks/useLang'
import { useTheme } from '../hooks/useTheme';
import MainLayout from './LayoutWrapper';
import MainNavbar from '../components/MainNavbar';
import AuthWrapper from './AuthWrapper';

export function RootLayout() {
    useLanguageDir()
    useTheme();

  return (
   <>
     <MainNavbar />
      <MainLayout>
      <AuthWrapper>
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
