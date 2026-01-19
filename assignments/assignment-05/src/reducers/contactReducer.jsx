// 1. Initial State
export const initialState = {
    loading: false,
    apiError: null,
    contactList: [],

    // Filters & Search
    filterType: 'default',
    searchQuery: '',
    currentPage: 1,

    // Selection & Forms
    selectedContact: null,
    formData: { fName: '', lName: '', email: '', phone: '', address: '' },

    // ✅ Single modal controller
    modalType: null, // 'details' | 'delete' | 'validation'

    validationError: '',
    isSubmitting: false,
};

const contactReducer = (state, action) => {
    switch (action.type) {
        // API & Loading States
        case 'SET_LOADING':
            return { ...state, loading: action.payload, apiError: null };

        case 'FETCH_SUCCESS':
            return {
                ...state,
                loading: false,
                contactList: action.payload,
                apiError: null,
            };

        case 'API_ERROR':
            return { ...state, loading: false, apiError: action.payload };

        // Form & Submission
        case 'START_SUBMIT':
            return { ...state, isSubmitting: true };

        case 'SUBMIT_SUCCESS':
            return {
                ...state,
                isSubmitting: false,
                modalType: null,
                selectedContact: null,
                formData: initialState.formData,
                validationError: '',
            };

        case 'SUBMIT_ERROR':
            return {
                ...state,
                isSubmitting: false,
                modalType: 'validation',
                validationError: action.payload,
            };

        case 'UPDATE_FORM':
            return { ...state, formData: action.payload };

        // Filtering & Search
        case 'SET_FILTER':
            return { ...state, filterType: action.payload, currentPage: 1 };

        case 'SET_SEARCH':
            return { ...state, searchQuery: action.payload, currentPage: 1 };

        case 'SET_PAGE':
            return { ...state, currentPage: action.payload };

        // ✅ Modals
        case 'OPEN_MODAL':
            return {
                ...state,
                modalType: action.payload.type,
                selectedContact: action.payload.contact ?? null,
                validationError: '',
            };

        case 'CLOSE_MODAL':
            return {
                ...state,
                modalType: null,
                selectedContact: null,
                validationError: '',
            };

        default:
            return state;
    }
};

export default contactReducer;
