import { Routes, Route } from 'react-router-dom'
import routes from '../routes'
import { useLanguageDir } from '../hooks/useLang'
import { useTheme } from '../hooks/useTheme';
import ThemeSwitcher from '../components/ThemeSwitcher';
import MainLayout from './LayoutWrapper';

export function RootLayout() {
    useLanguageDir()
    useTheme();

  return (
   <>
      <ThemeSwitcher />
      <MainLayout>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              element={route.component}
              path={route.path}
            />
          ))}
        </Routes>
      </MainLayout>
    </>           

  )
}
