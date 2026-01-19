import { Link } from 'react-router';

import { useContactContext } from '../contexts/ContactContext';
import DeleteModal from './DeleteModal';

const ShowDetailsModal = () => {
    const {
        modalType,
        openDeleteModal,
        selectedContact: contact,
        closeModal,
    } = useContactContext();

    if (!contact) return null;

    return (
        <>
            {/* Backdrop shadow */}
            <div
                className='modal-backdrop fade show'
                onClick={closeModal}
            ></div>

            {/* Modal Dialog */}
            <div className='modal show d-block' tabIndex='-1'>
                <div className='modal-dialog modal-lg'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>
                                Contact Details of {contact?.fName}{' '}
                                {contact?.lName}
                            </h5>
                            <button
                                type='button'
                                className='btn-close'
                                onClick={closeModal}
                            ></button>
                        </div>
                        <div className='modal-body'>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <div className='form-group row'>
                                        <label
                                            htmlFor='first_name'
                                            className='col-md-3 col-form-label'
                                        >
                                            First Name
                                        </label>
                                        <div
                                            id='first_name'
                                            className='col-md-9'
                                        >
                                            <p className='form-control-plaintext text-muted'>
                                                {contact?.fName}
                                            </p>
                                        </div>
                                    </div>

                                    <div className='form-group row'>
                                        <label
                                            htmlFor='last_name'
                                            className='col-md-3 col-form-label'
                                        >
                                            Last Name
                                        </label>
                                        <div
                                            id='last_name'
                                            className='col-md-9'
                                        >
                                            <p className='form-control-plaintext text-muted'>
                                                {contact?.lName}
                                            </p>
                                        </div>
                                    </div>

                                    <div className='form-group row'>
                                        <label
                                            htmlFor='email'
                                            className='col-md-3 col-form-label'
                                        >
                                            Email
                                        </label>
                                        <div id='email' className='col-md-9'>
                                            <p className='form-control-plaintext text-muted'>
                                                {contact?.email}
                                            </p>
                                        </div>
                                    </div>

                                    <div className='form-group row'>
                                        <label
                                            htmlFor='phone'
                                            className='col-md-3 col-form-label'
                                        >
                                            Phone
                                        </label>
                                        <div id='phone' className='col-md-9'>
                                            <p className='form-control-plaintext text-muted'>
                                                {contact?.phone}
                                            </p>
                                        </div>
                                    </div>

                                    <div className='form-group row'>
                                        <label
                                            htmlFor='address'
                                            className='col-md-3 col-form-label'
                                        >
                                            Address
                                        </label>
                                        <div id='address' className='col-md-9'>
                                            <p className='form-control-plaintext text-muted'>
                                                {contact?.address}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='form-group row'>
                                        <label
                                            htmlFor='time'
                                            className='col-md-3 col-form-label'
                                        >
                                            Added on
                                        </label>
                                        <div id='time' className='col-md-9'>
                                            <p className='form-control-plaintext text-muted'>
                                                {new Date(
                                                    contact.createdAt,
                                                ).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className='form-group row mb-0'>
                                        <div className='col-md-9 offset-md-3'>
                                            <Link
                                                to={`/contact/edit/${contact.id}`}
                                                state={{ contactData: contact }}
                                                className='btn btn-info'
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                className='btn btn-danger ms-2'
                                                onClick={openDeleteModal}
                                                title='Delete'
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button
                                className='btn btn-outline-secondary'
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {modalType === 'delete' && <DeleteModal />}
        </>
    );
};

export default ShowDetailsModal;
