/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";

// Create the context - this is like a "global state container"
const AppContext = createContext();

// Initial state structure
// This defines what our state will look like
const initialState = {
  // Data from API
  data: [],
  // Loading state - true when fetching data
  loading: false,
  // Error message if something goes wrong
  error: null,
  // Pagination
  currentPage: 1,
  pageSize: 5, // Default page size
  total: 0,
  totalPages: 0,
  // Search - client-side filtering
  searchQuery: "",
  // API filters - these will be sent to the API
  apiFilters: {},
  // Active tab (for products: "ALL" or "Laptops")
  activeTab: "ALL",
};

// Action types - these are like "commands" to change state
const ActionTypes = {
  SET_LOADING: "SET_LOADING",
  SET_DATA: "SET_DATA",
  SET_ERROR: "SET_ERROR",
  SET_PAGE: "SET_PAGE",
  SET_PAGE_SIZE: "SET_PAGE_SIZE",
  SET_SEARCH: "SET_SEARCH",
  SET_API_FILTER: "SET_API_FILTER",
  RESET_API_FILTERS: "RESET_API_FILTERS",
  SET_ACTIVE_TAB: "SET_ACTIVE_TAB",
};

// Reducer function - this decides how state changes based on actions
// Think of it as a "state update manager"
function appReducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };

    case ActionTypes.SET_DATA:
      return {
        ...state,
        data: action.payload.data || [],
        total: action.payload.total || 0,
        totalPages: action.payload.totalPages || 0,
        currentPage: action.payload.currentPage || state.currentPage,
        loading: false,
        error: null,
      };

    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case ActionTypes.SET_PAGE:
      return { ...state, currentPage: action.payload };

    case ActionTypes.SET_PAGE_SIZE:
      return {
        ...state,
        pageSize: action.payload,
        currentPage: 1, // Reset to first page when page size changes
      };

    case ActionTypes.SET_SEARCH:
      return { ...state, searchQuery: action.payload };

    case ActionTypes.SET_API_FILTER:
      // When setting one filter, reset others (as per requirements)
      return {
        ...state,
        apiFilters: { [action.payload.key]: action.payload.value },
        currentPage: 1, // Reset to first page when filter changes
      };

    case ActionTypes.RESET_API_FILTERS:
      return {
        ...state,
        apiFilters: {},
        currentPage: 1,
      };

    case ActionTypes.SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload,
        currentPage: 1, // Reset to first page when tab changes
      };

    default:
      return state;
  }
}

// Context Provider Component
// This wraps your app and provides the state to all children
export function AppProvider({ children }) {
  // useReducer is like useState but for complex state management
  // It takes a reducer function and initial state
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Helper functions to update state (these make it easier to use)
  const actions = {
    setLoading: (loading) =>
      dispatch({ type: ActionTypes.SET_LOADING, payload: loading }),

    setData: (data) => dispatch({ type: ActionTypes.SET_DATA, payload: data }),

    setError: (error) =>
      dispatch({ type: ActionTypes.SET_ERROR, payload: error }),

    setPage: (page) => dispatch({ type: ActionTypes.SET_PAGE, payload: page }),

    setPageSize: (size) =>
      dispatch({ type: ActionTypes.SET_PAGE_SIZE, payload: size }),

    setSearch: (query) =>
      dispatch({ type: ActionTypes.SET_SEARCH, payload: query }),

    setApiFilter: (key, value) =>
      dispatch({
        type: ActionTypes.SET_API_FILTER,
        payload: { key, value },
      }),

    resetApiFilters: () => dispatch({ type: ActionTypes.RESET_API_FILTERS }),

    setActiveTab: (tab) =>
      dispatch({ type: ActionTypes.SET_ACTIVE_TAB, payload: tab }),
  };

  // Provide state and actions to all children components
  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the context
// This makes it easy to access state and actions in any component
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}
