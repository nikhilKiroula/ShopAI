import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Products from "../pages/Products/Products";
import Categories from "../pages/Categories/Categories";
import Cart from "../pages/Cart/Cart";
import Wishlist from "../pages/Wishlist/Wishlist";
import Profile from "../pages/Profile/Profile";
import Orders from "../pages/Orders/Orders";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Checkout from "../pages/Checkout/Checkout";
import AddProduct from "../pages/Admin/Products/AddProduct";
import AdminProducts from "../pages/Admin/Products/Products";
import EditProduct from "../pages/Admin/Products/EditProduct";
import Addresses from "../pages/Address/Addresses";
import AddressForm from "../pages/Address/AddressForm";
import OrderDetails from "../pages/OrderDetails/OrderDetails";
import AdminRoute from "./AdminRoute";
import AdminOrders from "../pages/Admin/Orders/Orders";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import NotFound from "../pages/NotFound/NotFound";

import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
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
        path: "admin/products/add",
        element: (
          <ProtectedRoute>
            <AddProduct />
          </ProtectedRoute>
        ),
      },

      {
        path: "admin/products",
        element: (
          <ProtectedRoute>
            <AdminProducts />
          </ProtectedRoute>
        ),
      },

      {
        path: "admin/products/edit/:productId",
        element: (
          <ProtectedRoute>
            <EditProduct />
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

      {
        path: "admin/orders",
        element: (
          <AdminRoute>
            <AdminOrders />
          </AdminRoute>
        ),
      },
      
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

      {
        path: "about",
        element: <About />,
      },

      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },

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
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
