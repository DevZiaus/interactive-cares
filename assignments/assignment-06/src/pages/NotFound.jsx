import { Link } from 'react-router';

const NotFound = () => {
    return (
        <div className='flex flex-col items-center justify-center min-h-[80vh] px-4 text-center bg-gray-50 overflow-hidden relative'>
            <h1 className='text-[15rem] font-extrabold text-gray-200 select-none opacity-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0'>
                404
            </h1>

            <div className='relative z-10 max-w-2xl mx-auto'>
                <div className='mb-8 flex justify-center'>
                    <svg
                        className='w-24 h-24 text-blue-500 animate-bounce'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='1.5'
                            d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                        />
                    </svg>
                </div>

                <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight'>
                    Oops! You seem to be lost.
                </h2>

                <p className='text-lg text-gray-600 mb-8 leading-relaxed'>
                    The page you are looking for doesn't exist or has been
                    moved. Don't worry, we can help you find your way back.
                </p>

                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                    <Link
                        to='/'
                        className='px-8 py-3.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'
                    >
                        Back to Homepage
                    </Link>

                    <Link
                        to='/shop'
                        className='px-8 py-3.5 bg-white text-gray-700 font-bold border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300'
                    >
                        Go to Shop
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
