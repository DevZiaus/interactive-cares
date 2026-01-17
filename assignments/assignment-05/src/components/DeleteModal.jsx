const DeleteModal = ({ onConfirm, onClose, itemName }) => {
    return (
        <>
            <div className='modal-backdrop fade show' onClick={onClose}></div>
            <div className='modal show d-block' tabIndex='-1'>
                <div className='modal-dialog modal-dialog-centered'>
                    <div className='modal-content'>
                        <div className='modal-header bg-danger text-white'>
                            <h5 className='modal-title'>Confirm Delete</h5>
                            <button
                                type='button'
                                className='btn-close btn-close-white'
                                onClick={onClose}
                            ></button>
                        </div>
                        <div className='modal-body text-center py-4'>
                            <p className='mb-0'>
                                Are you sure you want to delete{' '}
                                <strong>{itemName}</strong>?
                            </p>
                            <small className='text-muted'>
                                This action cannot be undone.
                            </small>
                        </div>
                        <div className='modal-footer justify-content-center'>
                            <button
                                type='button'
                                className='btn btn-secondary'
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button
                                type='button'
                                className='btn btn-danger'
                                onClick={onConfirm}
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
