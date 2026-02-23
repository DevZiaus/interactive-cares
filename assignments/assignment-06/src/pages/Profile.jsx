import { useAuth } from '../hooks/useAuth';

const Profile = () => {
    const { user, role } = useAuth();

    // Helper function to get initials for the avatar
    const getInitials = (name) => {
        if (!name) return 'U';
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    return (
        <div className='max-w-3xl mx-auto space-y-6'>
            {/* Page Header */}
            <div>
                <h2 className='text-2xl font-bold text-gray-900'>My Profile</h2>
                <p className='mt-1 text-sm text-gray-500'>
                    View your account details and current role.
                </p>
            </div>

            {/* Profile Card */}
            <div className='bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden'>
                <div className='h-32 bg-linear-to-r from-blue-500 to-indigo-600'></div>

                <div className='px-6 sm:px-8 pb-8'>
                    {/* Avatar & Role Badge */}
                    <div className='relative flex justify-between items-end -mt-12 mb-8'>
                        {/* Avatar */}
                        <div className='w-24 h-24 bg-white rounded-full p-1 shadow-md shrink-0'>
                            {user?.photoURL ? (
                                <img
                                    src={user.photoURL}
                                    alt={user.displayName || 'Profile'}
                                    className='w-full h-full object-cover rounded-full border border-gray-100'
                                    referrerPolicy='no-referrer'
                                />
                            ) : (
                                <div className='w-full h-full bg-blue-50 rounded-full flex items-center justify-center text-3xl font-bold text-blue-600 border border-blue-100'>
                                    {getInitials(user?.displayName)}
                                </div>
                            )}
                        </div>

                        {/* Role Badge */}
                        <span
                            className={`px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm border ${
                                role === 'admin'
                                    ? 'bg-purple-50 text-purple-700 border-purple-200'
                                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            }`}
                        >
                            {role === 'admin' ? 'Administrator' : 'Customer'}
                        </span>
                    </div>

                    {/* Information Grid */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
                        <div>
                            <label className='block text-xs font-semibold tracking-wide text-gray-500 uppercase'>
                                Full Name
                            </label>
                            <div className='mt-1 text-lg text-gray-900 font-medium'>
                                {user?.displayName || 'Not provided'}
                            </div>
                        </div>

                        <div>
                            <label className='block text-xs font-semibold tracking-wide text-gray-500 uppercase'>
                                Email Address
                            </label>
                            <div className='mt-1 text-lg text-gray-900 font-medium'>
                                {user?.email}
                            </div>
                        </div>

                        <div className='sm:col-span-2'>
                            <label className='block text-xs font-semibold tracking-wide text-gray-500 uppercase'>
                                Account ID (UID)
                            </label>
                            <div className='mt-1 text-sm text-gray-600 font-mono bg-gray-50 p-3 rounded-lg border border-gray-100 break-all'>
                                {user?.uid}
                            </div>
                            <p className='mt-1 text-xs text-gray-400'>
                                This is your unique identifier in our database.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
