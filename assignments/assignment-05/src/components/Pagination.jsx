import { useContext } from 'react';
import { ContactContext } from '../contexts/ContactContext';

const Pagination = () => {
    const {
        contactList,
        currentPage,
        setCurrentPage,
        contactsPerPage,
        getFilteredAndSortedContacts,
    } = useContext(ContactContext);

    const totalFiltered = getFilteredAndSortedContacts().length;
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalFiltered / contactsPerPage); i++) {
        pageNumbers.push(i);
    }

    if (totalFiltered <= contactsPerPage) return null;

    return (
        <nav className='mt-4'>
            <ul className='pagination justify-content-center'>
                <li
                    className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
                >
                    <button
                        className='page-link'
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                        Previous
                    </button>
                </li>
                {pageNumbers.map((number) => (
                    <li
                        key={number}
                        className={`page-item ${currentPage === number ? 'active' : ''}`}
                    >
                        <button
                            className='page-link'
                            onClick={() => setCurrentPage(number)}
                        >
                            {number}
                        </button>
                    </li>
                ))}
                <li
                    className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}
                >
                    <button
                        className='page-link'
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};
export default Pagination;
