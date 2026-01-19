import { useContactContext } from '../contexts/ContactContext';

const ErrorModal = () => {
    const { validationError, closeModal } = useContactContext();
    return (
        <>
            <div
                className='modal-backdrop fade show'
                onClick={() => closeModal()}
            ></div>
            <div className='modal show d-block' tabIndex='-1'>
                <div className='modal-dialog modal-dialog-centered'>
                    <div className='modal-content'>
                        <div className='modal-header bg-danger text-white'>
                            <h5 className='modal-title'>Validation Error</h5>
                            <button
                                type='button'
                                className='btn-close btn-close-white'
                                onClick={() => closeModal()}
                            ></button>
                        </div>
                        <div className='modal-body text-center py-4'>
                            <p className='mb-0'>{validationError}</p>
                        </div>
                        <div className='modal-footer justify-content-center'>
                            <button
                                type='button'
                                className='btn btn-secondary'
                                onClick={() => closeModal()}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ErrorModal;
