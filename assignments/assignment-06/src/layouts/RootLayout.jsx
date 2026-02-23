import Footer from '../components/Footer';
import Header from '../components/Header';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <main className='grow container mx-auto px-4 py-8'>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default RootLayout;
