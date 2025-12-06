/**
 * DataTable Component
 * - Displays data in a table format
 * - Accepts columns configuration and data as props
 * - Responsive and styled with the app's color scheme
 *
 * @param {Array} columns - Array of column configuration objects
 *   Example: [{ key: 'id', label: 'ID' }, { key: 'name', label: 'Name' }]
 * @param {Array} data - Array of data objects to display
 */
export default function DataTable({ columns = [], data = [] }) {
  if (columns.length === 0) {
    return <div>No columns configured</div>;
  }

  if (data.length === 0) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
          color: "var(--color-black)",
        }}
      >
        No data available
      </div>
    );
  }

  // Helper function to format cell value
  const formatCellValue = (value) => {
    if (value === null || value === undefined) return "-";
    if (typeof value === "object") {
      // Handle objects/arrays - show a summary
      if (Array.isArray(value)) {
        return value.length > 0 ? `[${value.length} items]` : "[]";
      }
      return "[Object]";
    }
    return String(value);
  };

  return (
    <div
      style={{
        overflowX: "auto",
        border: `1px solid var(--color-black)`,
        borderRadius: "4px",
        backgroundColor: "white",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontFamily: "inherit",
        }}
      >
        {/* Table Header */}
        <thead>
          <tr
            style={{
              backgroundColor: "var(--color-blue)",
              borderBottom: `2px solid var(--color-black)`,
            }}
          >
            {columns.map((column) => (
              <th
                key={column.key}
                style={{
                  padding: "12px 16px",
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "var(--color-black)",
                  borderRight: `1px solid var(--color-black)`,
                }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={row.id || rowIndex}
              style={{
                borderBottom: `1px solid var(--color-grey)`,
                backgroundColor:
                  rowIndex % 2 === 0 ? "white" : "var(--color-grey)",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-blue)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  rowIndex % 2 === 0 ? "white" : "var(--color-grey)";
              }}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  style={{
                    padding: "12px 16px",
                    fontSize: "14px",
                    color: "var(--color-black)",
                    borderRight: `1px solid var(--color-grey)`,
                    maxWidth: "200px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={formatCellValue(row[column.key])}
                >
                  {column.render
                    ? column.render(row[column.key], row)
                    : formatCellValue(row[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
