// hooks/useContactActions.js
export const useContactActions = (apiUrl, contactList, fetchContacts) => {
    const validateForm = (formData) => {
        if (!formData.fName.trim()) return 'First Name is required!';
        if (!formData.email.trim()) return 'A valid Email address is required!';
        if (!formData.phone.trim()) return 'Phone number cannot be empty!';
        if (!formData.address.trim())
            return 'Please provide a residential address.';
        return null;
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

    const saveContact = async (formData) => {
        const isEditing = !!formData.id;
        const url = isEditing ? `${apiUrl}/${formData.id}` : apiUrl;
        const method = isEditing ? 'PUT' : 'POST';

        const payload = {
            ...formData,
            updatedAt: new Date().toISOString(),
            ...(isEditing ? {} : { createdAt: new Date().toISOString() }),
        };

        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            await fetchContacts();
            return true;
        }
        return false;
    };

    return { validateForm, getDuplicate, saveContact };
};
