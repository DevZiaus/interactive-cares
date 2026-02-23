import { Link, useNavigate, useLocation, Navigate } from 'react-router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { auth, db } from '../config/firebase';
import {
    setCredentials,
    setAuthLoading,
    setAuthError,
} from '../features/auth/authSlice';
import { useAuth } from '../hooks/useAuth';
import SocialLoginButtons from '../components/SocialLoginButtons';
import Loader from '../components/Loader';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        isAuthenticated,
        isLoading,
        isAppLoading,
        error: reduxError,
    } = useAuth();
    const location = useLocation();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    if (isAppLoading) {
        return <Loader text='Loading your session...' fullScreen={true} />;
    }

    if (isAuthenticated) {
        const from = location.state?.from?.pathname || '/dashboard';
        return <Navigate to={from} replace />;
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        if (reduxError) dispatch(setAuthError(null));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(setAuthLoading(true));

            const userCredential = await signInWithEmailAndPassword(
                auth,
                formData.email,
                formData.password,
            );
            const user = userCredential.user;

            const userDocRef = doc(db, 'users', user.uid);
            const userDocSnap = await getDoc(userDocRef);

            let userRole = 'user';
            if (userDocSnap.exists()) {
                userRole = userDocSnap.data().role;
            } else {
                console.warn('User document not found in Firestore!');
            }

            dispatch(
                setCredentials({
                    user: {
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName,
                    },
                    role: userRole,
                }),
            );

            const from = location.state?.from?.pathname || '/dashboard';
            navigate(from, { replace: true });
        } catch (err) {
            dispatch(
                setAuthError('Invalid email or password. Please try again.'),
            );
        }
    };

    return (
        <div className='flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100'>
                <div className='text-center'>
                    <h2 className='text-3xl font-extrabold text-gray-900'>
                        Welcome Back
                    </h2>
                    <p className='mt-2 text-sm text-gray-600'>
                        Sign in to your account to continue
                    </p>
                </div>

                <SocialLoginButtons />

                <h3 className='flex justify-center items-center'>Or</h3>

                {/* Error Display */}
                {reduxError && (
                    <div className='bg-red-50 text-red-500 p-3 rounded-md text-sm text-center'>
                        {reduxError}
                    </div>
                )}

                <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
                    <div className='space-y-4'>
                        <div>
                            <label
                                htmlFor='email'
                                className='block text-sm font-medium text-gray-700'
                            >
                                Email address
                            </label>
                            <input
                                id='email'
                                name='email'
                                type='email'
                                required
                                className='mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all'
                                placeholder='you@example.com'
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <div className='flex items-center justify-between'>
                                <label
                                    htmlFor='password'
                                    className='block text-sm font-medium text-gray-700'
                                >
                                    Password
                                </label>
                                <a
                                    href='#'
                                    className='text-sm font-medium text-blue-600 hover:text-blue-500'
                                >
                                    Forgot password?
                                </a>
                            </div>
                            <input
                                id='password'
                                name='password'
                                type='password'
                                required
                                className='mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all'
                                placeholder='••••••••'
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <button
                        type='submit'
                        disabled={isLoading}
                        className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white transition-colors shadow-md ${
                            isLoading
                                ? 'bg-blue-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                        }`}
                    >
                        {isLoading ? 'Signing in...' : 'Sign in'}
                    </button>

                    <div className='text-center text-sm'>
                        <span className='text-gray-600'>
                            Don't have an account?{' '}
                        </span>
                        <Link
                            to='/signup'
                            className='font-medium text-blue-600 hover:text-blue-500 transition-colors'
                        >
                            Create an account
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
