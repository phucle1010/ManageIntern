import React from 'react';
import config from '../config';
const Home = React.lazy(() => import('../screens/Home'));
const Login = React.lazy(() => import('../screens/Login'));
const ResetPassword = React.lazy(() => import('../components/ResetPassword'));

const routes = [
    {
        path: config.routes.home,
        element: Home,
    },
    {
        path: config.routes.login,
        element: Login,
    },
    {
        path: config.routes.resetPass,
        element: ResetPassword,
    },
];

export default routes;
