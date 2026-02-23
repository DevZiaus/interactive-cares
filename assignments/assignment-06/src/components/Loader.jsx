const Loader = ({ fullScreen = true, text = '' }) => {
    const containerClasses = fullScreen
        ? 'min-h-screen flex flex-col items-center justify-center bg-gray-50'
        : 'flex flex-col items-center justify-center p-4';

    return (
        <div className={containerClasses}>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600'></div>

            {text && (
                <p className='mt-4 text-sm font-medium text-gray-500'>{text}</p>
            )}
        </div>
    );
};

export default Loader;
