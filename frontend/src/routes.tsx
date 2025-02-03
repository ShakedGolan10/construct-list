import AuthPage from "./pages/auth/AuthPage"

const routes = [

    {
        path: '/',
        component: <AuthPage />,
        label: 'auth-page'
    },
    {
        path: '/main',
        component: <div />, 
        label: 'main-page'
    },
   
]

export default routes
