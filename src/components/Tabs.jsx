import { useAppContext } from "../context/AppContext";

/**
 * Tabs Component
 * - Displays tabs (e.g., "ALL", "Laptops" for products)
 * - Updates active tab in context
 *
 * @param {Array} tabs - Array of tab labels
 *   Example: ['ALL', 'Laptops']
 */
export default function Tabs({ tabs = [] }) {
  const { state, actions } = useAppContext();

  if (tabs.length === 0) return null;

  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        marginBottom: "20px",
        borderBottom: `2px solid var(--color-grey)`,
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => actions.setActiveTab(tab)}
          style={{
            padding: "12px 24px",
            border: "none",
            backgroundColor: "transparent",
            borderBottom: `3px solid ${
              state.activeTab === tab ? "var(--color-yellow)" : "transparent"
            }`,
            color: "var(--color-black)",
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: "14px",
            fontWeight: state.activeTab === tab ? "600" : "400",
            transition: "all 0.2s",
            marginBottom: "-2px",
          }}
          onMouseEnter={(e) => {
            if (state.activeTab !== tab) {
              e.target.style.backgroundColor = "var(--color-grey)";
            }
          }}
          onMouseLeave={(e) => {
            if (state.activeTab !== tab) {
              e.target.style.backgroundColor = "transparent";
            }
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
