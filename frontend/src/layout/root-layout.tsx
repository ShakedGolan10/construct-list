import { Routes, Route } from 'react-router'
import routes from '../routes'

export function RootLayout() {
  
  return (
    <>
    <Routes>
      {routes.map((route) => (
      <Route
        key={route.path}
        element={route.component}
        path={route.path}
      />
      ))}
    </Routes>           
    </>    

  )
}
