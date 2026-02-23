import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { auth, db } from '../../config/firebase';
import { setCredentials, setAppLoading } from './authSlice';
import { useAuth } from '../../hooks/useAuth';
import Loader from '../../components/Loader';

const AuthListener = ({ children }) => {
    const dispatch = useDispatch();
    const { isAppLoading } = useAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const userDocRef = doc(db, 'users', user.uid);
                    const userDocSnap = await getDoc(userDocRef);

                    let userRole = 'user';
                    if (userDocSnap.exists()) {
                        userRole = userDocSnap.data().role;
                    }

                    dispatch(
                        setCredentials({
                            user: {
                                uid: user.uid,
                                email: user.email,
                                displayName: user.displayName,
                                photoURL: user.photoURL,
                            },
                            role: userRole,
                        }),
                    );
                } catch (error) {
                    console.error('Error fetching user data:', error);

                    dispatch(setAppLoading(false));
                }
            } else {
                dispatch(setAppLoading(false));
            }
        });

        return () => unsubscribe();
    }, [dispatch]);

    if (isAppLoading) {
        return <Loader text='Loading your session...' fullScreen={true} />;
    }

    return children;
};

export default AuthListener;
