import { auth } from '../config/firebase';
import { logOut } from '../features/auth/authSlice';
import { signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

const LogoutButton = ({ className = 'w-full', onLogout }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            dispatch(logOut());

            if (onLogout) {
                onLogout();
            }

            navigate('/signin');
        } catch (error) {
            console.error('Failed to log out', error);
        }
    };
    return (
        <button
            onClick={handleLogout}
            className={`flex items-center justify-center gap-3 px-4 py-3 rounded-lg transition-colors text-red-600 hover:bg-red-50 hover:text-red-700 font-medium ${className}`}
        >
            <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
            >
                <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                />
            </svg>
            Logout
        </button>
    );
};

export default LogoutButton;
