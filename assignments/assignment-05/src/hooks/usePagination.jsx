import { useMemo } from 'react';

export const usePagination = (
    list,
    currentPage,
    setCurrentPage,
    contactsPerPage,
) => {
    const paginationData = useMemo(() => {
        const totalFiltered = list.length;
        const totalPages = Math.ceil(totalFiltered / contactsPerPage);
        const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

        return { totalFiltered, totalPages, pageNumbers };
    }, [list, contactsPerPage]);

    const displayContacts = useMemo(() => {
        // Safety check: ensure currentPage is a number
        const safePage = Number(currentPage) || 1;
        const start = (safePage - 1) * contactsPerPage;
        return list.slice(start, start + contactsPerPage);
    }, [list, currentPage, contactsPerPage]);

    const goToNextPage = () => {
        if (currentPage < paginationData.totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return { ...paginationData, displayContacts, goToNextPage, goToPrevPage };
};
