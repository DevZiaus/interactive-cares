import { useContext } from 'react';
import { Link } from 'react-router';
import { FaEye, FaEdit, FaTimes } from 'react-icons/fa';
import { ContactContext } from '../contexts/ContactContext';

const SingleContact = ({ contact, index }) => {
    const {
        setSelectedContact,
        setShowDetailsModal,
        setShowDeleteModal,
        currentPage,
        contactsPerPage,
    } = useContext(ContactContext);

    // Global serial number calculation
    const serialNumber = (currentPage - 1) * contactsPerPage + (index + 1);

    return (
        <tr>
            <td>{serialNumber}</td>
            <td>{contact.fName}</td>
            <td>{contact.lName}</td>
            <td>{contact.email}</td>
            <td>{contact.phone}</td>
            <td width='150' className='d-flex gap-2'>
                <button
                    className='btn btn-sm btn-circle btn-outline-info'
                    onClick={() => {
                        setSelectedContact(contact);
                        setShowDetailsModal(true);
                    }}
                    title='View'
                >
                    <FaEye />
                </button>
                <Link
                    to={`/contact/edit/${contact.id}`}
                    state={{ contactData: contact }}
                    className='btn btn-sm btn-circle btn-outline-secondary'
                    title='Edit'
                >
                    <FaEdit />
                </Link>
                <button
                    className='btn btn-sm btn-circle btn-outline-danger'
                    onClick={() => {
                        setSelectedContact(contact);
                        setShowDeleteModal(true);
                    }}
                    title='Delete'
                >
                    <FaTimes />
                </button>
            </td>
        </tr>
    );
};

export default SingleContact;
