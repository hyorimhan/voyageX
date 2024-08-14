'use client';

import ArrowLeftIcon16px from './icons/16px/ArrowLeftIcon16px';
import ArrowRightIcon16px from './icons/16px/ArrowRightIcon16px';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pageNumbers = [];
  let startPage, endPage;
  if (currentPage <= 3) {
    startPage = 1;
    endPage = Math.min(5, totalPages);
  } else if (currentPage >= totalPages - 2) {
    startPage = Math.max(1, totalPages - 4);
    endPage = totalPages;
  } else {
    startPage = currentPage - 2;
    endPage = currentPage + 2;
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='flex justify-center items-center gap-2 mt-14 mb-10'>
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className={`px-4 py-2 ${currentPage === 1 ? 'invisible' : ''}`}
      >
        <ArrowLeftIcon16px />
      </button>
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md  ${
            page === currentPage ? 'bg-primary-100 text-primary-600' : ''
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`px-4 py-2  ${
          currentPage === totalPages ? 'invisible' : ''
        }`}
      >
        <ArrowRightIcon16px />
      </button>
    </div>
  );
};

export default Pagination;
