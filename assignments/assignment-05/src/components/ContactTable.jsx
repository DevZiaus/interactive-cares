import { useEffect, useContext } from 'react';
import { ContactContext } from '../contexts/ContactContext';
import SignleContact from './SingleContact'; // Import the new component
import ShowDetailsModal from './ShowDetailsModal';
import DeleteModal from './DeleteModal';
import Pagination from './Pagination';

const ContactTable = () => {
    const {
        loading,
        error,
        contactList,
        showDetailsModal,
        setShowDetailsModal,
        showDeleteModal,
        setShowDeleteModal,
        selectedContact,
        deleteContact,
        fetchContacts,
        getDisplayContacts,
    } = useContext(ContactContext);

    const contacts = getDisplayContacts();

    useEffect(() => {
        fetchContacts();
    }, []);

    const handleDelete = async () => {
        if (!selectedContact) return;
        const success = await deleteContact(selectedContact.id);
        if (success) setShowDeleteModal(false);
    };

    return (
        <div className='card-body'>
            <table className='table table-striped table-hover'>
                <thead>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>First Name</th>
                        <th scope='col'>Last Name</th>
                        <th scope='col'>Email</th>
                        <th scope='col'>Phone</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {error && (
                        <tr className='alert alert-danger'>
                            <td
                                colSpan='6'
                                className='fw-bold fs-3 text-center'
                            >
                                {error}
                            </td>
                        </tr>
                    )}

                    {loading && (
                        <tr>
                            <td colSpan='6' className='text-center'>
                                <div className='spinner-border'></div>
                            </td>
                        </tr>
                    )}

                    {!error &&
                        !loading &&
                        contacts.map((contact, index) => (
                            <SignleContact
                                key={contact.id}
                                contact={contact}
                                index={index}
                            />
                        ))}

                    {!error && !loading && contacts.length === 0 && (
                        <tr>
                            <td
                                colSpan='6'
                                className='fw-bold fs-3 text-center'
                            >
                                No contacts found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <Pagination />

            {showDetailsModal && (
                <ShowDetailsModal
                    contact={selectedContact}
                    onClose={() => setShowDetailsModal(false)}
                />
            )}

            {showDeleteModal && (
                <DeleteModal
                    itemName={`${selectedContact.fName} ${selectedContact.lName}`}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={handleDelete}
                />
            )}
        </div>
    );
};

export default ContactTable;
