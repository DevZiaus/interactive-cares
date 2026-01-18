import { useContext } from 'react';
import { ContactContext } from '../contexts/ContactContext';

const DeleteModal = () => {
    const { selectedContact, setShowDeleteModal, confirmDelete } =
        useContext(ContactContext);

    if (!selectedContact) return null;

    return (
        <>
            <div
                className='modal-backdrop fade show'
                onClick={() => setShowDeleteModal(false)}
            ></div>
            <div className='modal show d-block' tabIndex='-1'>
                <div className='modal-dialog modal-dialog-centered'>
                    <div className='modal-content'>
                        <div className='modal-header bg-danger text-white'>
                            <h5 className='modal-title'>Confirm Delete</h5>
                            <button
                                type='button'
                                className='btn-close btn-close-white'
                                onClick={() => setShowDeleteModal(false)}
                            ></button>
                        </div>
                        <div className='modal-body text-center py-4'>
                            <p className='mb-0'>
                                Are you sure you want to delete{' '}
                                <strong>
                                    {selectedContact.fName}{' '}
                                    {selectedContact.lName}
                                </strong>{' '}
                                ?
                            </p>
                            <small className='text-muted'>
                                This action cannot be undone.
                            </small>
                        </div>
                        <div className='modal-footer justify-content-center'>
                            <button
                                type='button'
                                className='btn btn-secondary'
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type='button'
                                className='btn btn-danger'
                                onClick={confirmDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DeleteModal;
