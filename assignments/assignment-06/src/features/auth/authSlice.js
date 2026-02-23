import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    role: null,
    isAuthenticated: false,
    isLoading: false,
    isAppLoading: true,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload.user;
            state.role = action.payload.role;
            state.isAuthenticated = true;
            state.isLoading = false;
            state.isAppLoading = false;
            state.error = null;
        },

        logOut: (state) => {
            state.user = null;
            state.role = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.isAppLoading = false;
            state.error = null;
        },

        setAuthLoading: (state, action) => {
            state.isLoading = action.payload;
        },

        setAppLoading: (state, action) => {
            state.isAppLoading = action.payload;
        },

        setAuthError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

export const {
    setCredentials,
    logOut,
    setAuthLoading,
    setAppLoading,
    setAuthError,
} = authSlice.actions;

export default authSlice.reducer;
