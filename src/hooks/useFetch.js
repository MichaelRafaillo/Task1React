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

    // Build query parameters
    const params = {
      limit: state.pageSize,
      skip: (state.currentPage - 1) * state.pageSize,
      ...state.apiFilters, // Add any API filters
    };

    // Remove empty filters
    Object.keys(params).forEach((key) => {
      if (params[key] === "" || params[key] === null || params[key] === undefined) {
        delete params[key];
      }
    });

    // Make API call
    axiosClient
      .get(endpoint, { params })
      .then((response) => {
        // Update context with fetched data
        actions.setData({
          data: response.data[getDataKey(endpoint)] || [],
          total: response.data.total || 0,
          totalPages: Math.ceil(
            (response.data.total || 0) / state.pageSize
          ),
          currentPage: state.currentPage,
        });
      })
      .catch((error) => {
        // Handle errors
        actions.setError(
          error.response?.data?.message || error.message || "Failed to fetch data"
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

