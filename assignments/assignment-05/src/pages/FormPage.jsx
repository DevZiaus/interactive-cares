import { useLocation } from 'react-router';
import Form from '../components/Form.jsx';

const FormPage = () => {
    const location = useLocation();
    const contactData = location.state ? location.state.contactData : null;

    return (
        <div className='container'>
            <div className='row justify-content-md-center'>
                <div className='col-md-8'>
                    <div className='card'>
                        <div className='card-header card-title'>
                            <strong>
                                {contactData?.id
                                    ? 'Edit Contact'
                                    : 'Add New Contact'}
                            </strong>
                        </div>
                        <Form formData={contactData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormPage;
