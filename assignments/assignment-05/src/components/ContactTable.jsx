import { useEffect } from 'react';
import { useContactContext } from '../contexts/ContactContext';
import SignleContact from './SingleContact';
import ShowDetailsModal from './ShowDetailsModal';
import DeleteModal from './DeleteModal';
import Pagination from './Pagination';
import TableSkeleton from './TableSkeleton';

const ContactTable = () => {
    const { loading, apiError, fetchContacts, displayContacts, modalType } =
        useContactContext();

    const contacts = displayContacts;

    useEffect(() => {
        fetchContacts();
    }, []);

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
                    {apiError && (
                        <tr className='alert alert-danger'>
                            <td
                                colSpan='6'
                                className='fw-bold fs-3 text-center'
                            >
                                {apiError}
                            </td>
                        </tr>
                    )}

                    {loading && <TableSkeleton />}

                    {!apiError &&
                        !loading &&
                        contacts.map((contact, index) => (
                            <SignleContact
                                key={contact.id}
                                contact={contact}
                                index={index}
                            />
                        ))}

                    {!apiError && !loading && contacts.length === 0 && (
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

            {modalType === 'details' && <ShowDetailsModal />}
            {modalType === 'delete' && <DeleteModal />}
        </div>
    );
};

export default ContactTable;
