import { useContext } from 'react';
import { Link } from 'react-router';

import { FaPlusCircle } from 'react-icons/fa';

import { ContactContext } from '../contexts/ContactContext';

const Searchbar = () => {
    const { searchQuery, setSearchQuery } = useContext(ContactContext);

    return (
        <div className='card-header card-title'>
            <div className='d-flex align-items-center justify-content-between'>
                <h2>All Contacts</h2>
                <div className='input-group w-50'>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='search contact'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                        className='btn btn-success'
                        type='button'
                        id='button-addon2'
                    >
                        Search
                    </button>
                </div>
                <div>
                    <Link
                        to='/contact/add'
                        className='btn btn-success d-flex align-items-center gap-2'
                    >
                        <FaPlusCircle /> Add New
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Searchbar;
