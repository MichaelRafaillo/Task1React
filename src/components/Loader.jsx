/**
 * Loader Component
 * Displays a loading spinner while data is being fetched
 */
export default function Loader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          width: "50px",
          height: "50px",
          border: `4px solid var(--color-grey)`,
          borderTop: `4px solid var(--color-blue)`,
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
