import Header from '../components/Header';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        // <--- Add this
        <>
            <Header />
            <main className='py-5'>
                <Outlet />
            </main>
        </>
    );
};

export default RootLayout;
