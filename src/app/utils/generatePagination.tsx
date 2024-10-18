'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import '@/app/styles/pagination.scss';

interface PaginationProps {
  totalPages: number;
}

export default function PaginationPages({ totalPages }: PaginationProps) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const router = useRouter();

  // Create URL for a specific page
  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `/products?${params.toString()}`;
  };

  // Handle page change logic
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return; // Prevent out-of-bound navigation
    router.push(createPageURL(pageNumber));
  };

  return (
    <nav aria-label="Pagination Navigation" className="pagination">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        className="pagination__button"
      >
        Попередня
      </button>

      {/* Page Info */}
      <span className="pagination__info">
        {currentPage} з {totalPages}
      </span>

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
        className="pagination__button"
      >
        Наступна
      </button>
    </nav>
  );
}
