import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { useFetch } from "../hooks/useFetch";
import DataTable from "../components/DataTable";
import Filters from "../components/Filters";
import SearchBox from "../components/SearchBox";
import PageSizeSelector from "../components/PageSizeSelector";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";

/**
 * Users Page
 * - Displays users data in a table
 * - Has filters: firstName, lastName, age, email
 * - Supports pagination, search, and page size selection
 */
export default function Users() {
  const { actions } = useAppContext();
  const { data, loading, error, total } = useFetch("/users");

  // Reset filters and search when component mounts
  useEffect(() => {
    actions.resetApiFilters();
    actions.setSearch("");
    actions.setActiveTab("ALL"); // Reset tab for users page
  }, [actions]);

  // Define columns for the users table (12 columns as required)
  const columns = [
    { key: "id", label: "ID" },
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "age", label: "Age" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "username", label: "Username" },
    { key: "birthDate", label: "Birth Date" },
    { key: "bloodGroup", label: "Blood Group" },
    { key: "height", label: "Height" },
    { key: "weight", label: "Weight" },
    { key: "eyeColor", label: "Eye Color" },
  ];

  // Define filter fields for users
  const filterFields = [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "age", label: "Age" },
    { key: "email", label: "Email" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1
        style={{
          color: "var(--color-black)",
          marginBottom: "24px",
          fontSize: "28px",
          fontWeight: "600",
        }}
      >
        Users
      </h1>

      {/* Controls Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <SearchBox />
          <PageSizeSelector />
        </div>
        <div style={{ color: "var(--color-black)", fontSize: "14px" }}>
          Total: {total} users
        </div>
      </div>

      {/* Filters */}
      <Filters filterFields={filterFields} />

      {/* Error Message */}
      {error && (
        <div
          style={{
            padding: "12px",
            backgroundColor: "#fee",
            color: "#c00",
            borderRadius: "4px",
            marginBottom: "20px",
          }}
        >
          Error: {error}
        </div>
      )}

      {/* Loading State */}
      {loading && <Loader />}

      {/* Data Table */}
      {!loading && !error && <DataTable columns={columns} data={data} />}

      {/* Pagination */}
      {!loading && !error && <Pagination />}
    </div>
  );
}
