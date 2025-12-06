import { useAppContext } from "../context/AppContext";

/**
 * Pagination Component
 * - Displays page numbers and navigation buttons
 * - When clicked, sends request to API to fetch that page
 */
export default function Pagination() {
  const { state, actions } = useAppContext();

  const { currentPage, totalPages } = state;

  // Don't render if there's only one page or no pages
  if (totalPages <= 1) return null;

  // Calculate which page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5; // Show max 5 page numbers

    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages around current page
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, currentPage + 2);

      if (currentPage <= 3) {
        start = 1;
        end = maxVisible;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - maxVisible + 1;
        end = totalPages;
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      actions.setPage(page);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        marginTop: "20px",
      }}
    >
      {/* Previous button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          padding: "8px 12px",
          border: `1px solid var(--color-black)`,
          borderRadius: "4px",
          backgroundColor: currentPage === 1 ? "var(--color-grey)" : "white",
          color: currentPage === 1 ? "#999" : "var(--color-black)",
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
          fontFamily: "inherit",
          fontSize: "14px",
        }}
      >
        Previous
      </button>

      {/* Page numbers */}
      {pageNumbers[0] > 1 && (
        <>
          <button
            onClick={() => handlePageChange(1)}
            style={{
              padding: "8px 12px",
              border: `1px solid var(--color-black)`,
              borderRadius: "4px",
              backgroundColor: "white",
              color: "#322625",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: "14px",
              fontWeight: "400",
            }}
          >
            1
          </button>
          {pageNumbers[0] > 2 && <span style={{ padding: "0 4px" }}>...</span>}
        </>
      )}

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          style={{
            padding: "8px 12px",
            border: `1px solid var(--color-black)`,
            borderRadius: "4px",
            backgroundColor:
              currentPage === page ? "var(--color-blue)" : "white",
            color: "#322625",
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: "14px",
            fontWeight: currentPage === page ? "600" : "400",
          }}
        >
          {page}
        </button>
      ))}

      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <span style={{ padding: "0 4px" }}>...</span>
          )}
          <button
            onClick={() => handlePageChange(totalPages)}
            style={{
              padding: "8px 12px",
              border: `1px solid var(--color-black)`,
              borderRadius: "4px",
              backgroundColor: "white",
              color: "#322625",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: "14px",
            }}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          padding: "8px 12px",
          border: `1px solid var(--color-black)`,
          borderRadius: "4px",
          backgroundColor:
            currentPage === totalPages ? "var(--color-grey)" : "white",
          color: currentPage === totalPages ? "#999" : "var(--color-black)",
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          fontFamily: "inherit",
          fontSize: "14px",
        }}
      >
        Next
      </button>
    </div>
  );
}
