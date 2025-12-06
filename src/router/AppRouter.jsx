import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Users from "../pages/Users";
import Products from "../pages/Products";

/**
 * AppRouter Component
 * - Sets up routing for the application
 * - Defines routes for /users and /products
 * - Redirects root path to /users
 */
export default function AppRouter() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

