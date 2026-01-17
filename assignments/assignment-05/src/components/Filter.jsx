import { useContext } from 'react';
import { FaFilter } from 'react-icons/fa';
import { ContactContext } from '../contexts/ContactContext';

const Filter = () => {
    const { filterType, setFilterType } = useContext(ContactContext);

    return (
        <div className='d-flex align-items-center justify-content-between p-3'>
            <div className='d-flex align-items-center fs-4'>
                <FaFilter className='text-success me-2 fs-4' />
                Filter
            </div>
            <select
                id='filter'
                className='form-select w-25'
                aria-label='Default select example'
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
            >
                <option value='default'>Default</option>
                <option value='fName'>First Name (A → Z)</option>
                <option value='lName'>Last Name (A → Z)</option>
                <option value='oldest'>Oldest To First</option>
            </select>
        </div>
    );
};

export default Filter;
