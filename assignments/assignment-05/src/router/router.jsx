import { createBrowserRouter } from 'react-router';
import RootLayout from '../layouts/RootLayout';
import Home from '../pages/Home';
import FormPage from '../pages/FormPage';

export const contactRouter = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { path: '/', index: true, element: <Home /> },
            { path: 'contact/add', element: <FormPage /> },
            { path: 'contact/edit/:id', element: <FormPage /> },
        ],
    },
]);
