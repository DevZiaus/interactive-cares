import { createContext, useState, useEffect } from 'react';

export const ContactContext = createContext();

const ContactProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(null);
    const [contactList, setContactList] = useState([]);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [validationError, setValidationError] = useState('');
    const [showValidationModal, setShowValidationModal] = useState(false);
    const [filterType, setFilterType] = useState('default');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const contactsPerPage = 10;
    const [formData, setFormData] = useState({
        fName: '',
        lName: '',
        email: '',
        phone: '',
        address: '',
    });
    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchContacts = async () => {
        setLoading(true);
        setApiError(null);
        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(
                    `Server responded with status: ${response.status}`,
                );
            }

            const data = await response.json();
            setContactList([...data]);
        } catch (error) {
            setApiError('Failed to fetch contacts.');
            setContactList([]); // Reset to empty array so .map() doesn't crash
            console.error('Error fetching contacts:', error);
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        if (!formData.fName.trim()) {
            setValidationError('First Name is required!');
            return false;
        }
        if (!formData.email.trim()) {
            setValidationError('A valid Email address is required!');
            return false;
        }
        if (!formData.phone.trim()) {
            setValidationError('Phone number cannot be empty!');
            return false;
        }
        if (!formData.address.trim()) {
            setValidationError('Please provide a residential address.');
            return false;
        }
        return true; // Everything is valid
    };

    const getDuplicate = (formData) => {
        return contactList.find((c) => {
            if (formData.id && c.id === formData.id) return false;
            return (
                c.fName.toLowerCase() === formData.fName.toLowerCase() ||
                c.email.toLowerCase() === formData.email.toLowerCase() ||
                c.phone === formData.phone
            );
        });
    };

    const handleSubmitContact = async (navigate) => {
        // 1. Run validation
        if (!validateForm()) {
            setShowValidationModal(true);
            return;
        }

        // 2. Check duplicates
        if (getDuplicate(formData)) {
            setValidationError('This contact details already exist.');
            setShowValidationModal(true);
            return;
        }

        // 3. Submit
        setIsSubmitting(true);
        const success = await saveContact(formData);

        if (success) {
            // Reset local form state
            setFormData({
                fName: '',
                lName: '',
                email: '',
                phone: '',
                address: '',
            });
            setIsSubmitting(false);
            // Redirect
            navigate('/');
        } else {
            setValidationError('Failed to save contact.');
            setShowValidationModal(true);
            setIsSubmitting(false);
        }
    };

    const saveContact = async (formData) => {
        const isEditing = !!formData.id;
        const url = isEditing ? `${apiUrl}/${formData.id}` : apiUrl;
        const method = isEditing ? 'PUT' : 'POST';

        const payload = {
            ...formData,
            // Only set 'createdAt' if it's a new contact (POST)
            // If editing, keep the existing one or add an 'updatedAt'
            updatedAt: new Date().toISOString(),
            ...(isEditing ? {} : { createdAt: new Date().toISOString() }),
        };

        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            await fetchContacts();
            setShowDetailsModal(false);
            return true;
        }
        return false;
    };

    const deleteContact = async (id) => {
        setLoading(true);
        setApiError(null);
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setContactList((prev) => prev.filter((c) => c.id !== id));
                return true;
            } else {
                throw new Error('Failed to delete contact from server');
                return false;
            }
        } catch (error) {
            setError(error.message);
            return false;
        } finally {
            setLoading(false);
            setShowDeleteModal(false);
            setShowDetailsModal(false);
            setSelectedContact(null);
        }
    };

    const confirmDelete = () => {
        if (selectedContact) {
            deleteContact(selectedContact.id);
        }
    };

    const getFilteredAndSortedContacts = () => {
        let list = [...contactList];

        // 1. Apply Search Filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            list = list.filter(
                (c) =>
                    c.fName?.toLowerCase().includes(query) ||
                    c.lName?.toLowerCase().includes(query) ||
                    c.email?.toLowerCase().includes(query) ||
                    c.phone?.includes(query),
            );
        }

        // 2. Apply Sorting (Your existing switch logic)
        switch (filterType) {
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
    };

    const getDisplayContacts = () => {
        // 1. Get the list after Searching and Sorting
        const filteredSortedList = getFilteredAndSortedContacts();

        // 2. Calculate the start and end index for the current page
        const indexOfLastContact = currentPage * contactsPerPage;
        const indexOfFirstContact = indexOfLastContact - contactsPerPage;

        // 3. Slice the array to get only 10 items
        return filteredSortedList.slice(
            indexOfFirstContact,
            indexOfLastContact,
        );
    };

    // Reset page to 1 whenever search or filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, filterType]);

    return (
        <ContactContext.Provider
            value={{
                loading,
                setLoading,
                apiError,
                setApiError,
                isSubmitting,
                setIsSubmitting,
                showValidationModal,
                setShowValidationModal,
                validationError,
                setValidationError,
                handleSubmitContact,
                formData,
                setFormData,
                contactList,
                setContactList,
                filterType,
                setFilterType,
                searchQuery,
                setSearchQuery,
                getFilteredAndSortedContacts,
                showDetailsModal,
                setShowDetailsModal,
                showDeleteModal,
                setShowDeleteModal,
                selectedContact,
                setSelectedContact,
                deleteContact,
                confirmDelete,
                fetchContacts,
                validateForm,
                saveContact,
                getDuplicate,
                currentPage,
                setCurrentPage,
                contactsPerPage,
                getDisplayContacts,
            }}
        >
            {children}
        </ContactContext.Provider>
    );
};

export default ContactProvider;
