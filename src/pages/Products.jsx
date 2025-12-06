import { useEffect, useRef } from "react";
import { useAppContext } from "../context/AppContext";
import { useFetch } from "../hooks/useFetch";
import DataTable from "../components/DataTable";
import Filters from "../components/Filters";
import SearchBox from "../components/SearchBox";
import PageSizeSelector from "../components/PageSizeSelector";
import Pagination from "../components/Pagination";
import Tabs from "../components/Tabs";
import Loader from "../components/Loader";

/**
 * Products Page
 * - Displays products data in a table
 * - Has filters: Title, Brand, Category
 * - Has tabs: ALL and Laptops
 * - Supports pagination, search, and page size selection
 */
export default function Products() {
  const { state, actions } = useAppContext();
  const { data, loading, error, total } = useFetch("/products");
  const previousTabRef = useRef(state.activeTab);

  // Reset filters and search when component mounts
  useEffect(() => {
    actions.resetApiFilters();
    actions.setSearch("");
  }, [actions]);

  // Handle tab changes - filter by category when "Laptops" is selected
  useEffect(() => {
    const previousTab = previousTabRef.current;
    const currentTab = state.activeTab;

    // Only act if tab actually changed
    if (previousTab !== currentTab) {
      if (currentTab === "Laptops") {
        // Set category filter to laptops
        actions.setApiFilter("category", "laptops");
      } else if (currentTab === "ALL" && previousTab === "Laptops") {
        // Only reset when switching FROM Laptops TO ALL
        actions.resetApiFilters();
      }
      // Update the ref to current tab
      previousTabRef.current = currentTab;
    }
  }, [state.activeTab, actions]);

  // Define columns for the products table (12 columns as required)
  const columns = [
    { key: "id", label: "ID" },
    { key: "title", label: "Title" },
    { key: "description", label: "Description" },
    { key: "price", label: "Price" },
    { key: "discountPercentage", label: "Discount %" },
    { key: "rating", label: "Rating" },
    { key: "stock", label: "Stock" },
    { key: "brand", label: "Brand" },
    { key: "category", label: "Category" },
    {
      key: "thumbnail",
      label: "Thumbnail",
      render: (value) => (value ? "Yes" : "No"),
    },
    {
      key: "images",
      label: "Images",
      render: (value) =>
        Array.isArray(value) ? `${value.length} images` : "-",
    },
    { key: "availabilityStatus", label: "Availability" },
  ];

  // Define filter fields for products
  const filterFields = [
    { key: "title", label: "Title" },
    { key: "brand", label: "Brand" },
    { key: "category", label: "Category" },
  ];

  // Define tabs
  const tabs = ["ALL", "Laptops"];

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
        Products
      </h1>

      {/* Tabs */}
      <Tabs tabs={tabs} />

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
          Total: {total} products
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
