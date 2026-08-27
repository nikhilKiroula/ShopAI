import { createBrowserRouter, Navigate } from "react-router-dom";

// =====================================================
// Layouts
// =====================================================

import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

// =====================================================
// Route Guards
// =====================================================

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

// =====================================================
// User Pages
// =====================================================

import Home from "../pages/Home/Home";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Products from "../pages/Products/Products";
import Categories from "../pages/Categories/Categories";
import Cart from "../pages/Cart/Cart";
import Wishlist from "../pages/Wishlist/Wishlist";
import Profile from "../pages/Profile/Profile";
import Orders from "../pages/Orders/Orders";
import OrderDetails from "../pages/OrderDetails/OrderDetails";
import Checkout from "../pages/Checkout/Checkout";
import Addresses from "../pages/Address/Addresses";
import AddressForm from "../pages/Address/AddressForm";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";

// =====================================================
// Admin Pages
// =====================================================

import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import AddProduct from "../pages/Admin/Products/AddProduct";
import AdminProducts from "../pages/Admin/Products/Products";
import EditProduct from "../pages/Admin/Products/EditProduct";
import AdminOrders from "../pages/Admin/Orders/Orders";
import AdminOrderDetails from "../pages/Admin/Orders/OrderDetails";
import AdminUsers from "../pages/Admin/Users/Users";

// =====================================================
// Authentication Pages
// =====================================================

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";

// =====================================================
// Other Pages
// =====================================================

import NotFound from "../pages/NotFound/NotFound";

// =====================================================
// Application Router
// =====================================================

const router = createBrowserRouter([
  // ===================================================
  // USER APPLICATION ROUTES
  // ===================================================

  {
    path: "/",

    // MainLayout contains navbar/footer for normal users
    element: <MainLayout />,

    children: [
      // -------------------------------
      // Public Routes
      // -------------------------------

      {
        index: true,
        element: <Home />,
      },

      {
        path: "products",
        element: <Products />,
      },

      {
        path: "products/:productId",
        element: <ProductDetails />,
      },

      {
        path: "categories",
        element: <Categories />,
      },

      {
        path: "about",
        element: <About />,
      },

      {
        path: "contact",
        element: <Contact />,
      },

      // -------------------------------
      // Protected User Routes
      // -------------------------------

      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },

      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },

      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },

      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },

      // -------------------------------
      // User Orders
      // -------------------------------

      {
        path: "orders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },

      {
        path: "orders/:orderId",
        element: (
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        ),
      },

      // -------------------------------
      // User Addresses
      // -------------------------------

      {
        path: "addresses",
        element: (
          <ProtectedRoute>
            <Addresses />
          </ProtectedRoute>
        ),
      },

      {
        path: "addresses/new",
        element: (
          <ProtectedRoute>
            <AddressForm />
          </ProtectedRoute>
        ),
      },

      {
        path: "addresses/:addressId/edit",
        element: (
          <ProtectedRoute>
            <AddressForm />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // ===================================================
  // ADMIN APPLICATION ROUTES
  // ===================================================

  {
    path: "/admin",

    // AdminRoute checks authentication + admin role
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),

    children: [
      // -------------------------------
      // Admin Dashboard
      // -------------------------------

      {
        index: true,

        // /admin
        element: <Navigate to="/admin/dashboard" replace />,
      },

      {
        path: "dashboard",
        element: <Dashboard />,
      },

      // -------------------------------
      // Admin Products
      // -------------------------------

      {
        path: "products",

        // /admin/products
        element: <AdminProducts />,
      },

      {
        path: "products/add",

        // /admin/products/add
        element: <AddProduct />,
      },

      {
        path: "products/edit/:productId",

        // /admin/products/edit/:productId
        element: <EditProduct />,
      },

      // -------------------------------
      // Admin Orders
      // -------------------------------

      {
        path: "orders",

        // /admin/orders
        element: <AdminOrders />,
      },

      {
        path: "orders/:orderId",
        // /admin/orders/:orderId
        element: <AdminOrderDetails />,
      },

      // -------------------------------
      // All Users
      // -------------------------------

      {
        path: "users",
        element: <AdminUsers />,
      },
    ],
  },

  // ===================================================
  // AUTHENTICATION ROUTES
  // ===================================================

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },

  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
  },

  // ===================================================
  // 404 ROUTE
  // ===================================================

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
