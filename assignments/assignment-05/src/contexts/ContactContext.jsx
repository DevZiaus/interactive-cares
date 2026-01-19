import {
    createContext,
    useContext,
    useReducer,
    useMemo,
    useCallback,
    useEffect,
} from 'react';
import contactReducer, { initialState } from '../reducers/contactReducer';
import { usePagination } from '../hooks/usePagination';

export const ContactContext = createContext();

const ContactProvider = ({ children }) => {
    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Config
    const apiUrl = import.meta.env.VITE_API_URL;
    const contactsPerPage = 10;

    const setCurrentPage = useCallback((page) => {
        dispatch({ type: 'SET_PAGE', payload: page });
    }, []);

    const setFormData = useCallback((data) => {
        dispatch({ type: 'UPDATE_FORM', payload: data });
    }, []);

    // --- ACTIONS ---

    // Fetch Contacts
    const fetchContacts = useCallback(async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error(`Status: ${response.status}`);
            const data = await response.json();
            dispatch({ type: 'FETCH_SUCCESS', payload: data });
        } catch (error) {
            dispatch({
                type: 'API_ERROR',
                payload: 'Failed to fetch contacts.',
            });
        }
    }, [apiUrl]);

    // Delete Contact
    const deleteContact = async (id) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                const updatedList = state.contactList.filter(
                    (c) => c.id !== id,
                );
                dispatch({ type: 'FETCH_SUCCESS', payload: updatedList });
                dispatch({ type: 'CLOSE_MODAL' });
            } else {
                throw new Error('Failed to delete');
            }
        } catch (error) {
            dispatch({ type: 'API_ERROR', payload: error.message });
        }
    };

    // Save Contact (Add or Edit)
    const saveContact = async (formData) => {
        dispatch({ type: 'START_SUBMIT' });

        const isEditing = !!formData.id;
        const url = isEditing ? `${apiUrl}/${formData.id}` : apiUrl;
        const method = isEditing ? 'PUT' : 'POST';

        const payload = {
            ...formData,
            updatedAt: new Date().toISOString(),
            ...(isEditing ? {} : { createdAt: new Date().toISOString() }),
        };

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                await fetchContacts();
                dispatch({ type: 'SUBMIT_SUCCESS' });
                return true;
            }
            throw new Error('Failed to save');
        } catch (error) {
            dispatch({
                type: 'SUBMIT_ERROR',
                payload: 'Failed to save contact.',
            });
            return false;
        }
    };

    // --- LOGIC HELPER ---

    const validateForm = (data) => {
        if (!data) return 'Form data is missing';

        if (!data.fName?.trim()) return 'First Name is required!';
        if (!data.email?.trim()) return 'Valid Email is required!';
        if (!data.phone?.trim()) return 'Phone is required!';
        if (!data.address?.trim()) return 'Address is required!';

        // Check Duplicate
        const duplicate = state.contactList.find(
            (c) =>
                (c.email.toLowerCase() === data.email.toLowerCase() ||
                    c.phone === data.phone) &&
                c.id !== data.id,
        );
        if (duplicate) return 'This contact already exists.';

        return null;
    };

    const handleSubmitContact = async (navigate) => {
        const error = validateForm(state.formData);
        if (error) {
            dispatch({
                type: 'OPEN_MODAL',
                payload: { type: 'validation' },
            });
            dispatch({
                type: 'SUBMIT_ERROR',
                payload: error,
            });
            return;
        }

        const success = await saveContact(state.formData);
        if (success) navigate('/');
    };

    // --- MEMOIZED FILTERING (Performance Booster) ---

    const filteredList = useMemo(() => {
        let list = [...state.contactList];

        // 1. Search
        if (state.searchQuery.trim()) {
            const q = state.searchQuery.toLowerCase();
            list = list.filter(
                (c) =>
                    c.fName?.toLowerCase().includes(q) ||
                    c.lName?.toLowerCase().includes(q) ||
                    c.email?.toLowerCase().includes(q) ||
                    c.phone?.includes(q),
            );
        }

        // 2. Sort
        switch (state.filterType) {
            case 'fName':
                return list.sort((a, b) => a.fName.localeCompare(b.fName));
            case 'lName':
                return list.sort((a, b) => a.lName.localeCompare(b.lName));
            case 'oldest':
                return list.sort(
                    (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
                );
            default:
                return list.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
                );
        }
        return list;
    }, [state.contactList, state.searchQuery, state.filterType]);

    // --- PAGINATION HOOK ---
    const pagination = usePagination(
        filteredList,
        state.currentPage,
        setCurrentPage,
        contactsPerPage,
    );

    // --- HELPERS ---
    const confirmDelete = () => {
        if (state.selectedContact) deleteContact(state.selectedContact.id);
    };

    // ✅ Modal controls
    const openDetailsModal = (contact) => {
        dispatch({
            type: 'OPEN_MODAL',
            payload: { type: 'details', contact },
        });
    };

    const openDeleteModal = (contact) => {
        dispatch({
            type: 'OPEN_MODAL',
            payload: { type: 'delete', contact },
        });
    };

    const closeModal = useCallback(() => {
        dispatch({ type: 'CLOSE_MODAL' });
    }, []);

    useEffect(() => {
        // We only reset if we are not already on page 1
        if (state.currentPage !== 1) {
            setCurrentPage(1);
        }
    }, [state.searchQuery, state.filterType, setCurrentPage]);

    // --- PROVIDER VALUE ---
    const values = {
        ...state, // Exposes all state variables (loading, contactList, etc.)

        // Actions (Function Wrappers)
        setFilterType: (type) =>
            dispatch({ type: 'SET_FILTER', payload: type }),
        setSearchQuery: (query) =>
            dispatch({ type: 'SET_SEARCH', payload: query }),
        setSelectedContact: (contact) =>
            dispatch({ type: 'OPEN_DETAILS', payload: contact }),

        // Operations
        fetchContacts,
        deleteContact,
        confirmDelete,
        handleSubmitContact,
        closeModal,
        setCurrentPage,
        contactsPerPage,
        setFormData,
        openDetailsModal,
        openDeleteModal,

        // Pagination
        ...pagination,
    };

    return (
        <ContactContext.Provider value={values}>
            {children}
        </ContactContext.Provider>
    );
};

export default ContactProvider;

export function useContactContext() {
    return useContext(ContactContext);
}
