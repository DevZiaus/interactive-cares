import { Link } from 'react-router';
import { FaEye, FaEdit, FaTimes } from 'react-icons/fa';
import { useContactContext } from '../contexts/ContactContext';

const SingleContact = ({ contact, index }) => {
    const { currentPage, contactsPerPage, openDetailsModal, openDeleteModal } =
        useContactContext();

    const handleViewClick = (e) => {
        e.stopPropagation();
        openDetailsModal(contact);
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        openDeleteModal(contact);
    };

    const globalIndex = (currentPage - 1) * contactsPerPage + index + 1;

    return (
        <tr>
            <th scope='row'>{globalIndex}</th>
            <td>{contact.fName}</td>
            <td>{contact.lName}</td>
            <td>{contact.email}</td>
            <td>{contact.phone}</td>
            <td width='150' className='d-flex gap-2'>
                <button
                    className='btn btn-sm btn-circle btn-outline-info'
                    onClick={handleViewClick}
                    title='View'
                >
                    <FaEye />
                </button>
                <Link
                    to={`/contact/edit/${contact.id}`}
                    state={{ contactData: contact }}
                    onClick={(e) => e.stopPropagation()}
                    className='btn btn-sm btn-circle btn-outline-secondary'
                    title='Edit'
                >
                    <FaEdit />
                </Link>
                <button
                    className='btn btn-sm btn-circle btn-outline-danger'
                    onClick={handleDeleteClick}
                    title='Delete'
                >
                    <FaTimes />
                </button>
            </td>
        </tr>
    );
};

export default SingleContact;
