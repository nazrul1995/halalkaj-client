// Pagination Component
const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) pages.push(i);

  return (
    <div className="flex justify-center mt-8 gap-2">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
      >
        Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-3 py-1 border rounded hover:bg-primary hover:text-white ${
            page === currentPage ? "bg-primary text-white" : ""
          }`}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;