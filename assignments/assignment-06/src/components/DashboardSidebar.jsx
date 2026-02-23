import { NavLink } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import Logo from './Logo';
import LogoutButton from './LogoutButton';

import { dashboardMenuItems } from '../config/dashboardMenu';

const DashboardSidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
    const { role } = useAuth();

    const authorizedLinks = dashboardMenuItems.filter((item) =>
        item.roles.includes(role),
    );

    const linkClasses = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive
                ? 'bg-blue-50 text-blue-700 font-semibold'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'
        }`;

    // Extracted the navigation content so we don't duplicate code for desktop vs mobile
    const NavigationContent = () => (
        <div className='flex flex-col h-full'>
            <div className='shrink-0 p-4 border-b border-gray-200'>
                <Logo />
            </div>

            <nav className='flex-1 p-4 space-y-2 overflow-y-auto'>
                {authorizedLinks.map((link) => {
                    // Render unclickable disabled links
                    if (link.disabled) {
                        return (
                            <div
                                key={link.name}
                                className='flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 cursor-not-allowed font-medium select-none'
                                title='Coming soon'
                            >
                                {link.icon} {link.name}
                            </div>
                        );
                    }

                    // Render active React Router links
                    return (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            end={link.end}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={linkClasses}
                        >
                            {link.icon} {link.name}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Logout Button Section fixed to the bottom */}
            <div className='p-4 border-t border-gray-200 shrink-0'>
                <LogoutButton />
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className='hidden md:flex flex-col w-64 bg-white border-r border-gray-200 z-20 shrink-0 h-full'>
                <NavigationContent />
            </aside>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div className='md:hidden fixed inset-0 z-30'>
                    <div
                        className='absolute inset-0 bg-gray-800/50 transition-opacity'
                        onClick={() => setIsMobileMenuOpen(false)}
                    ></div>
                    <aside className='absolute inset-y-0 left-0 w-64 bg-white border-r border-gray-200 shadow-xl flex flex-col h-full'>
                        <NavigationContent />
                    </aside>
                </div>
            )}
        </>
    );
};

export default DashboardSidebar;
