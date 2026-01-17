import { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router';

import { ContactContext } from '../contexts/ContactContext';
import ErrorModal from './ErrorModal';

const Form = ({ formData: initialData }) => {
    const navigate = useNavigate();
    const {
        saveContact,
        getDuplicate,
        validateForm,
        isSubmitting,
        setIsSubmitting,
        showError,
        setShowError,
        errorMessage,
        setErrorMessage,
        formData,
        setFormData,
    } = useContext(ContactContext);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Run basic field validation
        if (!validateForm()) {
            setShowError(true);
            return;
        }

        // 2. Check for duplicates (logic moved to Context)
        const duplicate = getDuplicate(formData);
        if (duplicate) {
            setErrorMessage('This contact details already exist.');
            setShowError(true);
            return;
        }

        // 3. Submit data
        setIsSubmitting(true);
        const success = await saveContact(formData);

        if (success) {
            // 1. Clear the form data
            setFormData({
                fName: '',
                lName: '',
                email: '',
                phone: '',
                address: '',
            });

            // 2. Stop the loading state
            setIsSubmitting(false);

            // 3. Redirect to home
            navigate('/');
        } else {
            setErrorMessage('Failed to save contact.');
            setShowError(true);
            setIsSubmitting(false);
        }
    };

    return (
        <div className='card-body'>
            <div className='row'>
                <div className='col-md-12'>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group row'>
                            <label
                                htmlFor='first_name'
                                className='col-md-3 col-form-label'
                            >
                                First Name
                            </label>
                            <div className='col-md-9'>
                                <input
                                    type='text'
                                    name='fName'
                                    id='first_name'
                                    className='form-control'
                                    value={formData?.fName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className='form-group row'>
                            <label
                                htmlFor='last_name'
                                className='col-md-3 col-form-label'
                            >
                                Last Name
                            </label>
                            <div className='col-md-9'>
                                <input
                                    type='text'
                                    name='lName'
                                    id='last_name'
                                    className='form-control'
                                    value={formData?.lName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className='form-group row'>
                            <label
                                htmlFor='email'
                                className='col-md-3 col-form-label'
                            >
                                Email
                            </label>
                            <div className='col-md-9'>
                                <input
                                    type='text'
                                    name='email'
                                    id='email'
                                    className='form-control'
                                    value={formData?.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className='form-group row'>
                            <label
                                htmlFor='phone'
                                className='col-md-3 col-form-label'
                            >
                                Phone
                            </label>
                            <div className='col-md-9'>
                                <input
                                    type='text'
                                    name='phone'
                                    id='phone'
                                    className='form-control'
                                    value={formData?.phone}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className='form-group row'>
                            <label
                                htmlFor='address'
                                className='col-md-3 col-form-label'
                            >
                                Address
                            </label>
                            <div className='col-md-9'>
                                <input
                                    type='text'
                                    name='address'
                                    id='address'
                                    className='form-control'
                                    value={formData?.address}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <hr />
                        <div className='form-group row mb-0'>
                            <div className='col-md-9 offset-md-3 d-flex gap-2'>
                                <button
                                    type='submit'
                                    className='btn btn-primary'
                                    disabled={isSubmitting} // Disable button here
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className='spinner-border spinner-border-sm me-2'></span>
                                            Saving...
                                        </>
                                    ) : formData?.id ? (
                                        'Update'
                                    ) : (
                                        'Add'
                                    )}
                                </button>
                                <Link
                                    to='/'
                                    className='btn btn-outline-secondary'
                                >
                                    Cancel
                                </Link>
                            </div>
                        </div>
                    </form>
                    {showError && (
                        <ErrorModal
                            message={errorMessage}
                            onClose={() => setShowError(false)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Form;
