import { useState, useRef, useEffect } from "react";
import { useAppContext } from "../context/AppContext";

/**
 * PageSizeSelector Component
 * - Dropdown to select page size (5, 10, 20, 50)
 * - Default value is 5
 * - When changed, sends request to API and updates pagination
 */
export default function PageSizeSelector() {
  const { state, actions } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const pageSizeOptions = [5, 10, 20, 50];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePageSizeChange = (size) => {
    actions.setPageSize(size);
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      style={{ position: "relative", display: "inline-block" }}
    >
      {/* Button to open dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: "8px 16px",
          border: `1px solid var(--color-black)`,
          borderRadius: "4px",
          backgroundColor: "white",
          cursor: "pointer",
          fontFamily: "inherit",
          fontSize: "14px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span>Page Size: {state.pageSize}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="var(--color-black)"
          strokeWidth="2"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}
        >
          <path d="M2 4l4 4 4-4" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            marginTop: "4px",
            backgroundColor: "white",
            border: `1px solid var(--color-black)`,
            borderRadius: "4px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            zIndex: 1000,
            minWidth: "120px",
          }}
        >
          {pageSizeOptions.map((size) => (
            <button
              key={size}
              onClick={() => handlePageSizeChange(size)}
              style={{
                width: "100%",
                padding: "8px 16px",
                border: "none",
                backgroundColor:
                  state.pageSize === size ? "var(--color-blue)" : "white",
                cursor: "pointer",
                textAlign: "left",
                fontFamily: "inherit",
                fontSize: "14px",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                if (state.pageSize !== size) {
                  e.target.style.backgroundColor = "var(--color-grey)";
                }
              }}
              onMouseLeave={(e) => {
                if (state.pageSize !== size) {
                  e.target.style.backgroundColor = "white";
                }
              }}
            >
              {size}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
