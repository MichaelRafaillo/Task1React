import { useState } from "react";
import { useAppContext } from "../context/AppContext";

/**
 * SearchBox Component
 * - Shows a search icon that, when clicked, reveals a text input
 * - Filters data on the client side (no API call)
 */
export default function SearchBox() {
  const { state, actions } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchChange = (e) => {
    actions.setSearch(e.target.value);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      {/* Search Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-label="Toggle search"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-black)"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </button>

      {/* Search Input - shown when isOpen is true */}
      {isOpen && (
        <input
          type="text"
          placeholder="Search..."
          value={state.searchQuery}
          onChange={handleSearchChange}
          style={{
            padding: "8px 12px",
            border: `1px solid var(--color-black)`,
            borderRadius: "4px",
            fontSize: "14px",
            fontFamily: "inherit",
            outline: "none",
            minWidth: "200px",
          }}
        />
      )}
    </div>
  );
}
