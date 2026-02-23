import { useState } from 'react';
import { NavLink, Outlet } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import Footer from '../components/Footer';
import DashboardSidebar from '../components/DashboardSidebar';

const DashboardLayout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user } = useAuth();

    return (
        <div className='flex h-screen bg-gray-50 overflow-hidden'>
            <DashboardSidebar
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
            />

            <div className='flex-1 flex flex-col min-w-0 overflow-hidden'>
                {/* Header */}
                <header className='h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-10 shrink-0'>
                    <div className='flex items-center'>
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className='md:hidden mr-4 p-2 text-gray-600 hover:bg-gray-100 rounded-lg focus:outline-none'
                        >
                            <svg
                                className='w-6 h-6'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M4 6h16M4 12h16M4 18h16'
                                ></path>
                            </svg>
                        </button>
                        <h1 className='text-xl font-semibold text-gray-800 hidden sm:block'>
                            Dashboard
                        </h1>
                    </div>

                    <div className='flex items-center gap-4'>
                        <span className='text-sm font-medium text-gray-600'>
                            Hello, {user?.displayName || 'User'}
                        </span>
                        <NavLink
                            to='/'
                            className='text-sm text-blue-600 hover:underline font-medium'
                        >
                            Return to Store &rarr;
                        </NavLink>
                    </div>
                </header>

                {/* Main Content */}
                <main className='flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8'>
                    <Outlet />
                </main>

                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
};

export default DashboardLayout;
