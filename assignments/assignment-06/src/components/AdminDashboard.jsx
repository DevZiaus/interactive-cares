const AdminDashboard = () => {
    return (
        <div className='bg-indigo-50 border border-indigo-100 p-6 rounded-lg shadow-sm'>
            <h2 className='text-xl font-semibold text-indigo-800 mb-4'>
                Admin Hub
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                <div className='bg-white p-4 rounded shadow-sm border border-gray-100'>
                    <h3 className='font-medium text-gray-700'>
                        Manage Products
                    </h3>
                    <p className='text-sm text-gray-500 mt-1'>
                        Add, edit, or remove store assets.
                    </p>
                    <button className='mt-3 text-sm text-indigo-600 hover:underline'>
                        Go to Catalog &rarr;
                    </button>
                </div>
                <div className='bg-white p-4 rounded shadow-sm border border-gray-100'>
                    <h3 className='font-medium text-gray-700'>
                        View All Orders
                    </h3>
                    <p className='text-sm text-gray-500 mt-1'>
                        Process customer transactions.
                    </p>
                    <button className='mt-3 text-sm text-indigo-600 hover:underline'>
                        Go to Orders &rarr;
                    </button>
                </div>
                <div className='bg-white p-4 rounded shadow-sm border border-gray-100'>
                    <h3 className='font-medium text-gray-700'>
                        User Management
                    </h3>
                    <p className='text-sm text-gray-500 mt-1'>
                        Handle account permissions.
                    </p>
                    <button className='mt-3 text-sm text-indigo-600 hover:underline'>
                        Go to Users &rarr;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
