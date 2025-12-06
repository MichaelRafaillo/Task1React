import { Link, useLocation } from "react-router-dom";

/**
 * MainLayout Component
 * - Provides the main layout structure for the app
 * - Includes navigation between Users and Products pages
 */
export default function MainLayout({ children }) {
  const location = useLocation();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-grey)",
      }}
    >
      {/* Navigation Header */}
      <header
        style={{
          backgroundColor: "var(--color-black)",
          padding: "16px 20px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <nav
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            gap: "24px",
          }}
        >
          <Link
            to="/users"
            style={{
              color: location.pathname === "/users" ? "var(--color-yellow)" : "white",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: location.pathname === "/users" ? "600" : "400",
              padding: "8px 16px",
              borderRadius: "4px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              if (location.pathname !== "/users") {
                e.target.style.color = "var(--color-blue)";
              }
            }}
            onMouseLeave={(e) => {
              if (location.pathname !== "/users") {
                e.target.style.color = "white";
              }
            }}
          >
            Users
          </Link>
          <Link
            to="/products"
            style={{
              color: location.pathname === "/products" ? "var(--color-yellow)" : "white",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: location.pathname === "/products" ? "600" : "400",
              padding: "8px 16px",
              borderRadius: "4px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              if (location.pathname !== "/products") {
                e.target.style.color = "var(--color-blue)";
              }
            }}
            onMouseLeave={(e) => {
              if (location.pathname !== "/products") {
                e.target.style.color = "white";
              }
            }}
          >
            Products
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        {children}
      </main>
    </div>
  );
}

