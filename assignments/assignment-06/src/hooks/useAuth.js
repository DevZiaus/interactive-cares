import { useSelector } from 'react-redux';

export const useAuth = () => {
    const { user, role, isAuthenticated, isLoading, isAppLoading, error } =
        useSelector((state) => state.auth);

    const isAdmin = role === 'admin';
    const isCustomer = role === 'user';

    return {
        user,
        role,
        isAuthenticated,
        isLoading,
        isAppLoading,
        error,
        isAdmin,
        isCustomer,
    };
};
