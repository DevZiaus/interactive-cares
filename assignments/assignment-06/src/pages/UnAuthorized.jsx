import { useNavigate } from 'react-router';

const UnAuthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);
    const goHome = () => navigate('/');

    return (
        <div className='min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8'>
            <div className='max-w-md w-full text-center space-y-8'>
                <div className='mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-red-100'>
                    <svg
                        className='h-12 w-12 text-red-600'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth='2'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                        />
                    </svg>
                </div>

                <div>
                    <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
                        Access Denied
                    </h2>
                    <p className='mt-2 text-sm text-gray-600'>
                        You don't have the required permissions to view this
                        page. If you believe this is a mistake, please contact
                        support.
                    </p>
                </div>

                <div className='flex flex-col sm:flex-row items-center justify-center gap-4 mt-8'>
                    <button
                        onClick={goBack}
                        className='w-full sm:w-auto px-6 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors'
                    >
                        Go Back
                    </button>
                    <button
                        onClick={goHome}
                        className='w-full sm:w-auto px-6 py-2.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors'
                    >
                        Return to Shop
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UnAuthorized;
