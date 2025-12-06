import { AppProvider } from "./context/AppContext";
import AppRouter from "./router/AppRouter";

/**
 * App Component
 * - Root component that wraps the app with Context Provider
 * - Provides state management to all child components
 */
function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;
