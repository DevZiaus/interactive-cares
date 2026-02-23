const UserDashboard = () => {
    return (
        <div className='bg-emerald-50 border border-emerald-100 p-6 rounded-lg shadow-sm'>
            <h2 className='text-xl font-semibold text-emerald-800 mb-4'>
                My Account
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='bg-white p-4 rounded shadow-sm border border-gray-100'>
                    <h3 className='font-medium text-gray-700'>
                        Track My Orders
                    </h3>
                    <p className='text-sm text-gray-500 mt-1'>
                        View status of recent purchases.
                    </p>
                    <button className='mt-3 text-sm text-emerald-600 hover:underline'>
                        View History &rarr;
                    </button>
                </div>
                <div className='bg-white p-4 rounded shadow-sm border border-gray-100'>
                    <h3 className='font-medium text-gray-700'>Saved Items</h3>
                    <p className='text-sm text-gray-500 mt-1'>
                        Products you favorited.
                    </p>
                    <button className='mt-3 text-sm text-emerald-600 hover:underline'>
                        View Wishlist &rarr;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
