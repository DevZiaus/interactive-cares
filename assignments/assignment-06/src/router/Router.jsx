import { createBrowserRouter } from 'react-router';
import RootLayout from '../layouts/RootLayout';

import RequireAuth from '../features/auth/RequireAuth';

// Pages
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Signin from '../pages/Signin';
import NotFound from '../pages/NotFound';
import UnAuthorized from '../pages/UnAuthorized';

// Protected Pages
import Dashboard from '../pages/Dashboard';
import DashboardLayout from '../layouts/DashboardLayout';
import Profile from '../pages/Profile';

export const router = createBrowserRouter([
    // Root layout pages
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { path: '/', index: true, element: <Home /> },
            { path: '/signin', element: <Signin /> },
            { path: '/signup', element: <Signup /> },
            { path: '/unauthorized', element: <UnAuthorized /> },
            { path: '*', element: <NotFound /> },
        ],
    },
    // Dashboard Layout pages
    {
        element: <RequireAuth allowedRoles={['user', 'admin']} />,
        children: [
            {
                path: '/dashboard',
                element: <DashboardLayout />,
                children: [
                    { index: true, element: <Dashboard /> },
                    { path: '/dashboard/profile', element: <Profile /> },
                ],
            },
        ],
    },
]);
