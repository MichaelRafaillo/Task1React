import { useAppContext } from "../context/AppContext";

/**
 * Filters Component
 * - Accepts filter fields as props
 * - When typing in a filter, it sends a request to the API
 * - When one filter is used, others are reset (as per requirements)
 *
 * @param {Array} filterFields - Array of filter field objects
 *   Example: [{ key: 'firstName', label: 'First Name' }, ...]
 */
export default function Filters({ filterFields = [] }) {
  const { state, actions } = useAppContext();

  const handleFilterChange = (key, value) => {
    if (value.trim() === "") {
      // If empty, reset all filters
      actions.resetApiFilters();
    } else {
      // Set the filter (this will reset other filters automatically)
      actions.setApiFilter(key, value);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        flexWrap: "wrap",
        marginBottom: "20px",
      }}
    >
      {filterFields.map((field) => (
        <div
          key={field.key}
          style={{ display: "flex", flexDirection: "column", gap: "4px" }}
        >
          <label
            style={{
              fontSize: "12px",
              fontWeight: "500",
              color: "var(--color-black)",
            }}
          >
            {field.label}
          </label>
          <input
            type="text"
            value={state.apiFilters[field.key] || ""}
            onChange={(e) => handleFilterChange(field.key, e.target.value)}
            placeholder={`Filter by ${field.label}`}
            style={{
              padding: "8px 12px",
              border: `1px solid var(--color-black)`,
              borderRadius: "4px",
              fontSize: "14px",
              fontFamily: "inherit",
              outline: "none",
              minWidth: "150px",
            }}
          />
        </div>
      ))}
    </div>
  );
}
