import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
// import App from './App.jsx';
import { contactRouter } from './router/router.jsx';
import { RouterProvider } from 'react-router';
import ContactProvider from './contexts/ContactContext.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ContactProvider>
            <RouterProvider router={contactRouter} />
        </ContactProvider>
        {/* <App /> */}
    </StrictMode>,
);
