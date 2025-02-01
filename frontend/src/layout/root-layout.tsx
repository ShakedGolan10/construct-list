import { Routes, Route } from 'react-router-dom'
import routes from '../routes'
import { useLanguageDir } from '../hooks/useLang'
import { useTheme } from '../hooks/useTheme';
import ThemeSwitcher from '../components/ThemeSwitcher';

export function RootLayout() {
    useLanguageDir()
    useTheme();

  return (
    <div className='min-h-screen bg-base-100 text-base-content'>
    <ThemeSwitcher />
    <Routes>
      {routes.map((route) => (
      <Route
        key={route.path}
        element={route.component}
        path={route.path}
      />
      ))}   
    </Routes>           
    </div>    

  )
}
