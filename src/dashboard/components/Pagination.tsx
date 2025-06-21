import { FaChevronLeft, FaChevronRight, FaEllipsisH } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  const pageNumbers = [];
  const maxVisiblePages = 5;

  // Calculate range of page numbers to display
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
      {/* Page size selector */}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">Show</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span className="text-sm text-gray-600">per page</span>
      </div>

      {/* Page navigation */}
      <div className="flex items-center space-x-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-md ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          aria-label="Previous page"
        >
          <FaChevronLeft />
        </button>

        {/* First page */}
        {startPage > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className={`w-10 h-10 rounded-md ${
                1 === currentPage
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              1
            </button>
            {startPage > 2 && (
              <span className="w-10 h-10 flex items-center justify-center text-gray-500">
                <FaEllipsisH />
              </span>
            )}
          </>
        )}

        {/* Middle pages */}
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-md ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Last page */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="w-10 h-10 flex items-center justify-center text-gray-500">
                <FaEllipsisH />
              </span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className={`w-10 h-10 rounded-md ${
                totalPages === currentPage
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-md ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          aria-label="Next page"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
