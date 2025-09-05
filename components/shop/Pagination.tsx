import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Function to generate page numbers with ellipses
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 3; // how many pages to show around current page

    if (totalPages <= 7) {
      // show all if few pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1); // always show first page

      if (currentPage > maxVisible) {
        pages.push("..."); // left ellipsis
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - maxVisible + 1) {
        pages.push("..."); // right ellipsis
      }

      pages.push(totalPages); // always show last page
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex justify-center gap-2 mt-8">

      <button
        className="px-3 py-1 rounded-full border bg-white text-black disabled:opacity-50"
        onClick={() => onPageChange && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >&lt;</button>

      {pages.map((page, idx) =>
        page === "..." ? (
          <span key={`dots-${idx}`} className="px-3 py-1">
            {page}
          </span>
        ) : (
          <button
            key={`page-${idx}`}
            className={`px-3 py-1 rounded-full border ${
              page === currentPage
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-gray-100"
            }`}
            onClick={() => onPageChange && onPageChange(page as number)}
          >
            {page}
          </button>
        )
      )}

      <button
        className="px-3 py-1 rounded-full border bg-white text-black disabled:opacity-50"
        onClick={() => onPageChange && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >&gt;</button>
    </div>
  );
};

export default Pagination;

/* import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="flex justify-center gap-2 mt-8">
      {pages.map((page) => (
        <button
          key={page}
          className={`px-3 py-1 rounded border ${
            page === currentPage ? "bg-black text-white" : "bg-white text-black"
          }`}
          onClick={() => onPageChange && onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
 */
