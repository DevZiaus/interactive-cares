import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { auth, db } from '../config/firebase';
import {
    setCredentials,
    setAuthLoading,
    setAuthError,
} from '../features/auth/authSlice';
import SocialLoginButtons from '../components/SocialLoginButtons';
import { useAuth } from '../hooks/useAuth';

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, error: reduxError } = useAuth();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [localError, setLocalError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setLocalError('');
        if (reduxError) dispatch(setAuthError(null));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Basic Validation

        if (formData.fullName.trim === '') {
            setLocalError('Name is required!');
            return;
        }

        if (formData.email.trim === '') {
            setLocalError('Email is required!');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setLocalError('Passwords do not match');
            return;
        }

        try {
            dispatch(setAuthLoading(true));

            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password,
            );
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: formData.fullName,
            });

            const userRole = 'user';
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                displayName: formData.fullName,
                role: userRole,
                createdAt: new Date().toISOString(),
            });

            dispatch(
                setCredentials({
                    user: {
                        uid: user.uid,
                        email: user.email,
                        displayName: formData.fullName,
                    },
                    role: userRole,
                }),
            );

            navigate('/dashboard');
        } catch (err) {
            dispatch(setAuthError(err.message));
        }
    };

    return (
        <div className='flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100'>
                <div className='text-center'>
                    <h2 className='text-3xl font-extrabold text-gray-900'>
                        Create Account
                    </h2>
                    <p className='mt-2 text-sm text-gray-600'>
                        Join today for exclusive deals
                    </p>
                </div>

                <SocialLoginButtons />

                <h3 className='flex justify-center items-center'>Or</h3>

                {/* Error Display */}
                {(localError || reduxError) && (
                    <div className='bg-red-50 text-red-500 p-3 rounded-md text-sm text-center'>
                        {localError || reduxError}
                    </div>
                )}

                <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
                    <div className='space-y-4'>
                        <div>
                            <label
                                htmlFor='fullName'
                                className='block text-sm font-medium text-gray-700'
                            >
                                Full Name
                            </label>
                            <input
                                id='fullName'
                                name='fullName'
                                type='text'
                                required
                                className='mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all'
                                placeholder='John Doe'
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </div>
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
                            <label
                                htmlFor='password'
                                className='block text-sm font-medium text-gray-700'
                            >
                                Password
                            </label>
                            <input
                                id='password'
                                name='password'
                                type='password'
                                required
                                minLength='6'
                                className='mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all'
                                placeholder='Create a password'
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor='confirmPassword'
                                className='block text-sm font-medium text-gray-700'
                            >
                                Confirm Password
                            </label>
                            <input
                                id='confirmPassword'
                                name='confirmPassword'
                                type='password'
                                required
                                minLength='6'
                                className='mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all'
                                placeholder='Confirm your password'
                                value={formData.confirmPassword}
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
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                    </button>

                    <div className='text-center text-sm'>
                        <span className='text-gray-600'>
                            Already have an account?{' '}
                        </span>
                        <Link
                            to='/signin'
                            className='font-medium text-blue-600 hover:text-blue-500 transition-colors'
                        >
                            Sign in here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
