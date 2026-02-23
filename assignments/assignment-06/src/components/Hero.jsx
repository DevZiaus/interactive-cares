import { Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import LogoutButton from './LogoutButton';

const Hero = () => {
    const { isAuthenticated } = useAuth();

    return (
        <section className='bg-white py-12 lg:py-24 overflow-hidden'>
            <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex flex-col lg:flex-row items-center gap-12 lg:gap-20'>
                    <div className='w-full lg:w-1/2 text-center lg:text-left'>
                        <h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight'>
                            Authentication System
                            <br className='hidden lg:block' />
                            With <span className='text-cyan-500'>DevZiaus</span>
                        </h1>
                        <p className='mt-6 text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0'>
                            Want to discover the Authentication system, with
                            React, Firebase, Tailwind, React Router, Redux and
                            RTK Query? Register or Login to see the auth system.
                        </p>

                        {isAuthenticated ? (
                            <div className='mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
                                <Link
                                    to='/dashboard'
                                    className='px-8 py-3.5 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 w-full md:w-1/2 lg:w-1/3'
                                >
                                    Dashboard
                                </Link>

                                <LogoutButton className='w-full md:w-1/2 lg:w-1/3' />
                            </div>
                        ) : (
                            <div className='mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
                                <Link
                                    to='/signin'
                                    className='px-8 py-3.5 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 w-full md:w-1/2 lg:w-1/3 flex justify-center'
                                >
                                    Login
                                </Link>
                                <Link
                                    to='/signup'
                                    className='px-8 py-3.5 bg-white text-gray-700 border border-gray-200 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 w-full md:w-1/2 lg:w-1/3 flex justify-center'
                                >
                                    Register
                                </Link>
                            </div>
                        )}

                        <div className='mt-10 flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-500 font-medium'>
                            <div className='flex -space-x-2'>
                                <div className='w-8 h-8 rounded-full bg-gray-200 border-2 border-white'></div>
                                <div className='w-8 h-8 rounded-full bg-gray-300 border-2 border-white'></div>
                                <div className='w-8 h-8 rounded-full bg-gray-400 border-2 border-white'></div>
                            </div>
                            <p>Trusted by 5,000+ Customers</p>
                        </div>
                    </div>

                    <div className='w-full lg:w-1/2 relative'>
                        <div className='absolute top-0 right-0 -z-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob'></div>
                        <div className='absolute bottom-0 left-0 -z-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000'></div>

                        <img
                            src='https://bs-uploads.toptal.io/blackfish-uploads/components/blog_post_page/6050490/cover_image/retina_1708x683/Untitled-9077cf482d2b3aeec5b460f30f64c856.png'
                            alt='Fashion Model'
                            className='w-full h-auto rounded-2xl shadow-2xl transform hover:scale-[1.01] transition duration-500 object-cover'
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
