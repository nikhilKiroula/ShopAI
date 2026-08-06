import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./index.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import router from "@/routes/AppRoutes";
import { CartProvider, WishlistProvider } from "@/context";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WishlistProvider>
      <CartProvider>
        <RouterProvider router={router} />

        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 2000,

            style: {
              borderRadius: "12px",
              background: "#fff",
              color: "#111827",
            },

            success: {
              iconTheme: {
                primary: "#16a34a",
                secondary: "#ffffff",
              },
            },

            error: {
              iconTheme: {
                primary: "#dc2626",
                secondary: "#ffffff",
              },
            },
          }}
        />
      </CartProvider>
    </WishlistProvider>
  </StrictMode>
);