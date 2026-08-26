// =====================================================
// NavActions.jsx
// =====================================================
// Ye component navbar ke right side mein
// action buttons render karta hai:
//   - Wishlist icon (badge with count)
//   - Cart icon (badge with count)
//   - Admin Panel icon (sirf admin role ke liye)
//   - User/Account menu
//
// Mobile pe:
//   - Sirf icons show hote hain (labels hidden)
//   - Wishlist md:hidden rahega kyunki mobile menu mein hai
// Desktop pe:
//   - Icons + labels dono visible hain
// =====================================================

import { Heart, ShoppingCart, LayoutDashboard } from "lucide-react";
import ROUTES from "@/constants/routes";

import ActionItem from "./ActionItem";
import UserMenu from "./UserMenu";

import { useCart, useWishlist, useAuth } from "@/context";

const NavActions = () => {
  // Cart context se items fetch karo
  const { cartItems } = useCart();

  // Wishlist context se items fetch karo
  const { wishlistItems } = useWishlist();

  // Auth context se user info fetch karo
  const { user } = useAuth();

  // -------------------------------------------------------
  // Cart Count Calculation
  // -------------------------------------------------------
  // Har item ki quantity add karke total count nikalo
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="flex items-center gap-2 md:gap-6">

      {/* -----------------------------------------------
          Wishlist Button
          -----------------------------------------------
          Mobile pe hide karo - wishlist MobileMenu mein hai.
          `hidden md:flex` se mobile pe nahi dikhega.
      ----------------------------------------------- */}
      <div className="hidden md:flex">
        <ActionItem
          to={ROUTES.WISHLIST}
          icon={Heart}
          label="Wishlist"
          badgeCount={wishlistItems.length}
        />
      </div>

      {/* -----------------------------------------------
          Cart Button
          -----------------------------------------------
          Cart mobile pe bhi visible rahega (important action).
      ----------------------------------------------- */}
      <ActionItem
        to={ROUTES.CART}
        icon={ShoppingCart}
        label="Cart"
        badgeCount={cartCount}
      />

      {/* -----------------------------------------------
          Admin Panel Button
          -----------------------------------------------
          Sirf admin role wale user ko dikhega.
      ----------------------------------------------- */}
      {user?.role === "admin" && (
        <div className="hidden md:flex">
          <ActionItem
            to="/admin/dashboard"
            icon={LayoutDashboard}
            label="Admin"
          />
        </div>
      )}

      {/* -----------------------------------------------
          User/Account Menu
          -----------------------------------------------
          Desktop pe full dropdown, mobile pe simple icon.
      ----------------------------------------------- */}
      <UserMenu />
    </div>
  );
};

export default NavActions;