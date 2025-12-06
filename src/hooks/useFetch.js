import { useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { useAppContext } from "../context/AppContext";

/**
 * Custom hook for fetching data from the API
 * This hook handles:
 * - Loading states
 * - Error handling
 * - API calls with filters and pagination
 * - Updating the context with fetched data
 *
 * @param {string} endpoint - API endpoint (e.g., '/users' or '/products')
 * @param {object} options - Additional options like skip (to prevent auto-fetch)
 */
export function useFetch(endpoint, options = {}) {
  const { state, actions } = useAppContext();
  const { skip = false } = options;

  useEffect(() => {
    // Skip fetching if skip is true (useful for manual fetching)
    if (skip) return;

    // Don't fetch if there's no endpoint
    if (!endpoint) return;

    // Set loading state
    actions.setLoading(true);

    // Check if we have filters
    const hasFilters = Object.keys(state.apiFilters).length > 0;
    const filterKey = hasFilters ? Object.keys(state.apiFilters)[0] : null;
    const filterValue = hasFilters ? state.apiFilters[filterKey] : null;

    // Define numeric fields that need client-side filtering
    const numericFields = ["age", "height", "weight", "id"];
    const isNumericFilter = filterKey && numericFields.includes(filterKey);

    // Determine endpoint and parameters
    let actualEndpoint = endpoint;
    let params = {};

    if (hasFilters) {
      if (isNumericFilter && endpoint === "/users") {
        // For numeric filters on users, fetch all data and filter client-side
        // DummyJSON has a limit, so fetch a reasonable amount
        actualEndpoint = endpoint; // Use regular endpoint, not search
        params = {
          limit: 100, // Fetch more data for accurate filtering
          skip: 0,
        };
      } else if (endpoint === "/users") {
        // For text filters on users, use search endpoint
        actualEndpoint = `${endpoint}/search`;
        params = {
          limit: state.pageSize,
          skip: (state.currentPage - 1) * state.pageSize,
          q: filterValue,
        };
      } else if (endpoint === "/products") {
        // For products, check if filtering by category
        if (filterKey === "category") {
          // Use category-specific endpoint (DummyJSON format: /products/category/laptops)
          actualEndpoint = `${endpoint}/category/${filterValue.toLowerCase()}`;
          params = {
            limit: state.pageSize,
            skip: (state.currentPage - 1) * state.pageSize,
          };
        } else {
          // For other product filters (title, brand), use search endpoint
          actualEndpoint = `${endpoint}/search`;
          params = {
            limit: state.pageSize,
            skip: (state.currentPage - 1) * state.pageSize,
            q: filterValue,
          };
        }
      } else {
        // For other endpoints, use regular endpoint with filters
        actualEndpoint = endpoint;
        params = {
          limit: state.pageSize,
          skip: (state.currentPage - 1) * state.pageSize,
          ...state.apiFilters,
        };
      }
    } else {
      // No filters, use normal pagination
      params = {
        limit: state.pageSize,
        skip: (state.currentPage - 1) * state.pageSize,
      };
    }

    // Remove empty parameters
    Object.keys(params).forEach((key) => {
      if (
        params[key] === "" ||
        params[key] === null ||
        params[key] === undefined
      ) {
        delete params[key];
      }
    });

    // Make API call
    axiosClient
      .get(actualEndpoint, { params })
      .then((response) => {
        let fetchedData = response.data[getDataKey(endpoint)] || [];
        let total = response.data.total || 0;

        // Apply client-side filtering for numeric fields
        if (hasFilters && isNumericFilter && filterValue) {
          const numericValue = Number(filterValue);
          if (!isNaN(numericValue)) {
            // Filter for exact numeric match
            fetchedData = fetchedData.filter((item) => {
              const itemValue = Number(item[filterKey]);
              return !isNaN(itemValue) && itemValue === numericValue;
            });
            total = fetchedData.length;

            // Apply pagination after filtering
            const startIndex = (state.currentPage - 1) * state.pageSize;
            const endIndex = startIndex + state.pageSize;
            fetchedData = fetchedData.slice(startIndex, endIndex);
          }
        } else if (
          hasFilters &&
          filterValue &&
          endpoint === "/users" &&
          !isNumericFilter
        ) {
          // For text filters on users, do additional client-side filtering
          // for field-specific matching (since search endpoint searches all fields)
          const searchLower = String(filterValue).toLowerCase();
          fetchedData = fetchedData.filter((item) => {
            const fieldValue = item[filterKey];
            if (fieldValue === null || fieldValue === undefined) return false;
            return String(fieldValue).toLowerCase().includes(searchLower);
          });
          total = fetchedData.length;

          // Apply pagination after filtering
          const startIndex = (state.currentPage - 1) * state.pageSize;
          const endIndex = startIndex + state.pageSize;
          fetchedData = fetchedData.slice(startIndex, endIndex);
        } else if (
          hasFilters &&
          filterValue &&
          endpoint === "/products" &&
          filterKey === "category"
        ) {
          // For category filter, ensure we only show products matching the category
          // (API should handle this, but add client-side filter as safety)
          const categoryLower = String(filterValue).toLowerCase();
          fetchedData = fetchedData.filter((item) => {
            const itemCategory = item.category
              ? String(item.category).toLowerCase()
              : "";
            return itemCategory === categoryLower;
          });
          total = fetchedData.length;

          // Apply pagination after filtering
          const startIndex = (state.currentPage - 1) * state.pageSize;
          const endIndex = startIndex + state.pageSize;
          fetchedData = fetchedData.slice(startIndex, endIndex);
        } else if (
          hasFilters &&
          filterValue &&
          endpoint === "/products" &&
          filterKey !== "category" &&
          !isNumericFilter
        ) {
          // For text filters on products (except category), do additional client-side filtering
          // for field-specific matching (since search endpoint searches all fields)
          const searchLower = String(filterValue).toLowerCase();
          fetchedData = fetchedData.filter((item) => {
            const fieldValue = item[filterKey];
            if (fieldValue === null || fieldValue === undefined) return false;
            return String(fieldValue).toLowerCase().includes(searchLower);
          });
          total = fetchedData.length;

          // Apply pagination after filtering
          const startIndex = (state.currentPage - 1) * state.pageSize;
          const endIndex = startIndex + state.pageSize;
          fetchedData = fetchedData.slice(startIndex, endIndex);
        }

        // Update context with fetched data
        actions.setData({
          data: fetchedData,
          total: total,
          totalPages: Math.ceil(total / state.pageSize),
          currentPage: state.currentPage,
        });
      })
      .catch((error) => {
        // Handle errors
        actions.setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to fetch data"
        );
        console.error("Fetch error:", error);
      });
  }, [
    endpoint,
    state.currentPage,
    state.pageSize,
    state.apiFilters,
    state.activeTab, // Re-fetch when tab changes
    skip,
    actions, // Include actions in dependency array
  ]);

  // Return filtered data based on search query (client-side filtering)
  const filteredData = state.searchQuery
    ? state.data.filter((item) => {
        // Search through all string/number values in the item
        const searchLower = state.searchQuery.toLowerCase();
        return Object.values(item).some((value) => {
          if (value === null || value === undefined) return false;
          return String(value).toLowerCase().includes(searchLower);
        });
      })
    : state.data;

  return {
    data: filteredData,
    loading: state.loading,
    error: state.error,
    total: state.total,
    totalPages: state.totalPages,
    currentPage: state.currentPage,
    pageSize: state.pageSize,
  };
}

/**
 * Helper function to determine the data key from endpoint
 * e.g., '/users' returns 'users', '/products' returns 'products'
 */
function getDataKey(endpoint) {
  // Remove leading slash and return the key
  const key = endpoint.replace(/^\//, "");
  // Handle plural/singular (users -> users, products -> products)
  return key;
}
