import AdminDashboard from '../components/AdminDashboard';
import UserDashboard from '../components/UserDashboard';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
    const { user, role } = useAuth();

    return (
        <div className='max-w-4xl mx-auto py-8 px-4'>
            <h1 className='text-3xl font-bold text-gray-800 mb-6'>
                Welcome back, {user?.displayName || 'User'}!
            </h1>

            {role === 'admin' ? <AdminDashboard /> : <UserDashboard />}
        </div>
    );
};

export default Dashboard;
