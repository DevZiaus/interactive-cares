import { useState } from 'react';
import { NavLink } from 'react-router';

import { useAuth } from '../hooks/useAuth';
import LogoutButton from './LogoutButton';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated } = useAuth();

    const closeMenu = () => setIsOpen(false);

    const navLinks = [
        { name: 'Home', path: '/', show: true },
        { name: 'Dashboard', path: '/dashboard', show: isAuthenticated },
    ].filter((link) => link.show);

    const defaultLinkStyle =
        'text-gray-600 hover:text-blue-600 font-medium pb-1 transition-colors';
    const activeLinkStyle = 'text-blue-600 font-bold pb-1 transition-colors';
    const defaultMobileStyle =
        'text-gray-600 hover:bg-gray-50 hover:text-blue-600 font-medium block px-4 py-2 rounded-lg';
    const activeMobileStyle =
        'text-blue-600 font-bold bg-blue-50 block px-4 py-2 rounded-lg';

    return (
        <>
            {/* Desktop Menu */}
            <div className='hidden md:flex gap-8 items-center'>
                {navLinks.map((link) => (
                    <NavLink
                        key={link.name}
                        to={link.path}
                        className={({ isActive }) =>
                            isActive ? activeLinkStyle : defaultLinkStyle
                        }
                    >
                        {link.name}
                    </NavLink>
                ))}

                {!isAuthenticated ? (
                    <NavLink
                        to='/signin'
                        className={({ isActive }) =>
                            isActive ? activeLinkStyle : defaultLinkStyle
                        }
                    >
                        Login
                    </NavLink>
                ) : (
                    <LogoutButton />
                )}
            </div>

            {/* Mobile Menu Button */}
            <div className='md:hidden flex items-center'>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className='text-gray-600 hover:text-blue-600 focus:outline-none'
                >
                    {isOpen ? (
                        <svg
                            className='w-6 h-6'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M6 18L18 6M6 6l12 12'
                            />
                        </svg>
                    ) : (
                        <svg
                            className='w-6 h-6'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M4 6h16M4 12h16M4 18h16'
                            />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className='absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-lg md:hidden z-50'>
                    <div className='flex flex-col p-4 space-y-2'>
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                    isActive
                                        ? activeMobileStyle
                                        : defaultMobileStyle
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}

                        {!isAuthenticated ? (
                            <NavLink
                                to='/signin'
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                    isActive
                                        ? activeMobileStyle
                                        : defaultMobileStyle
                                }
                            >
                                Login
                            </NavLink>
                        ) : (
                            <LogoutButton onLogout={closeMenu} />
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
