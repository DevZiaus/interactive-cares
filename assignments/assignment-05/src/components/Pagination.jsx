import { useContactContext } from '../contexts/ContactContext';

const Pagination = () => {
    const {
        pageNumbers,
        totalPages,
        goToNextPage,
        goToPrevPage,
        currentPage,
        setCurrentPage,
        totalFiltered,
        contactsPerPage,
    } = useContactContext();

    if (totalFiltered <= contactsPerPage) return null;

    return (
        <nav className='mt-4'>
            <ul className='pagination justify-content-center'>
                {/* Previous Button */}
                <li
                    className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
                >
                    <button className='page-link' onClick={goToPrevPage}>
                        Prev
                    </button>
                </li>

                {/* Numeric Page Buttons */}
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

                {/* Next Button */}
                <li
                    className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
                >
                    <button className='page-link' onClick={goToNextPage}>
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
