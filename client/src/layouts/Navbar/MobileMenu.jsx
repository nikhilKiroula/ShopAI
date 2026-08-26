// =====================================================
// MobileMenu.jsx
// =====================================================
// Ye component mobile devices ke liye sliding drawer
// menu provide karta hai.
//
// Features:
//   - Hamburger icon se open/close hota hai
//   - Overlay click se bhi band hota hai
//   - Categories, Cart, Wishlist, Account links
//   - Smooth slide-in animation
// =====================================================

import { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  X,
  ShoppingCart,
  Heart,
  User,
  LogIn,
  LayoutDashboard,
} from "lucide-react";

import ROUTES from "@/constants/routes";
import { useAuth, useCart, useWishlist } from "@/context";

// -------------------------------------------------------
// MobileMenu Component
// -------------------------------------------------------
// Props:
//   isOpen     - boolean: menu open hai ya nahi
//   onClose    - function: menu band karne ka callback
//   categories - array: category names list (CategoryBar se)
// -------------------------------------------------------

const MobileMenu = ({ isOpen, onClose, categories = [] }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();

  // Cart mein kitne items hain count karo
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // -------------------------------------------------------
  // Body Scroll Lock
  // -------------------------------------------------------
  // Jab menu open ho toh page scroll band kar do
  // Jab menu band ho toh scroll wapas enable karo
  // -------------------------------------------------------
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup: component unmount hone pe scroll restore karo
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // -------------------------------------------------------
  // Logout Handler
  // -------------------------------------------------------
  const handleLogout = async () => {
    await logout();
    onClose(); // Menu band karo logout ke baad
  };

  // -------------------------------------------------------
  // NavLink Active Class Helper
  // -------------------------------------------------------
  // Active link highlight karne ke liye CSS classes
  const getLinkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-colors duration-200 ${
      isActive
        ? "bg-blue-50 text-[#0B57D0]"
        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
    }`;

  return (
    <>
      {/* =====================================================
          Dark Overlay (Background Dimmer)
          =====================================================
          Menu ke peeche dark overlay show hota hai.
          Click karne pe menu band ho jaata hai.
          `isOpen` ke basis pe opacity aur visibility change
          hoti hai (smooth transition ke liye).
      ===================================================== */}
      <div
        className={`
          fixed inset-0 z-40 bg-black/50
          transition-opacity duration-300
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* =====================================================
          Sliding Drawer Panel
          =====================================================
          Left side se slide-in hota hai.
          `translateX` se slide animation achieve hoti hai:
            - isOpen: translateX(0)  → visible
            - closed: translateX(-100%) → hidden
      ===================================================== */}
      <aside
        className={`
          fixed left-0 top-0 z-50
          h-full w-[80vw] max-w-sm
          overflow-y-auto
          bg-white
          shadow-2xl
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        aria-label="Mobile navigation menu"
      >
        {/* ---------------------------------------------------
            Header: Logo + Close Button
        --------------------------------------------------- */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
          {/* ShopAI Logo */}
          <Link
            to={ROUTES.HOME}
            onClick={onClose}
            className="text-2xl font-bold text-gray-900"
          >
            Shop<span className="text-[#0B57D0]">AI</span>
          </Link>

          {/* Close (X) Button */}
          <button
            type="button"
            onClick={onClose}
            className="
              flex h-9 w-9 items-center justify-center
              rounded-full
              text-gray-500
              transition-colors
              hover:bg-gray-100 hover:text-gray-700
            "
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* ---------------------------------------------------
            Main Navigation Links
            (Menu ke andar scroll ho sakta hai agar content
            zyada ho)
        --------------------------------------------------- */}
        <nav className="flex flex-col gap-1 p-4">

          {/* -----------------------------------------------
              Quick Actions: Cart & Wishlist
          ----------------------------------------------- */}
          <p className="mb-1 px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Quick Links
          </p>

          {/* Cart Link */}
          <Link
            to={ROUTES.CART}
            onClick={onClose}
            className="
              flex items-center gap-3
              rounded-xl px-4 py-3
              text-base font-medium text-gray-700
              transition-colors duration-200
              hover:bg-gray-100 hover:text-gray-900
            "
          >
            <div className="relative">
              <ShoppingCart size={20} />
              {/* Cart badge: items hain toh show karo */}
              {cartCount > 0 && (
                <span className="
                  absolute -right-2 -top-2
                  flex h-4 w-4 items-center justify-center
                  rounded-full bg-red-500
                  text-[9px] font-bold text-white
                ">
                  {cartCount}
                </span>
              )}
            </div>
            Cart
            {/* Cart item count text */}
            {cartCount > 0 && (
              <span className="ml-auto rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                {cartCount} items
              </span>
            )}
          </Link>

          {/* Wishlist Link */}
          <Link
            to={ROUTES.WISHLIST}
            onClick={onClose}
            className="
              flex items-center gap-3
              rounded-xl px-4 py-3
              text-base font-medium text-gray-700
              transition-colors duration-200
              hover:bg-gray-100 hover:text-gray-900
            "
          >
            <div className="relative">
              <Heart size={20} />
              {/* Wishlist badge */}
              {wishlistItems.length > 0 && (
                <span className="
                  absolute -right-2 -top-2
                  flex h-4 w-4 items-center justify-center
                  rounded-full bg-red-500
                  text-[9px] font-bold text-white
                ">
                  {wishlistItems.length}
                </span>
              )}
            </div>
            Wishlist
            {wishlistItems.length > 0 && (
              <span className="ml-auto rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          {/* -----------------------------------------------
              Categories Section
              Backend se fetch ki gayi categories
          ----------------------------------------------- */}
          {categories.length > 0 && (
            <>
              <div className="my-2 border-t border-gray-200" />

              <p className="mb-1 px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Categories
              </p>

              {/* Category Links - dynamic list */}
              {categories.map((category) => (
                <NavLink
                  key={category}
                  to={`/products?category=${encodeURIComponent(category)}`}
                  onClick={onClose} // Menu band karo link click pe
                  className={getLinkClass}
                >
                  {/* Category name ko capitalize karo */}
                  {category
                    .split(" ")
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(" ")}
                </NavLink>
              ))}
            </>
          )}

          {/* -----------------------------------------------
              Account / Auth Section
          ----------------------------------------------- */}
          <div className="my-2 border-t border-gray-200" />

          <p className="mb-1 px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Account
          </p>

          {isAuthenticated ? (
            <>
              {/* Logged-in user ka naam */}
              <div className="flex items-center gap-3 rounded-xl px-4 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100">
                  <User size={18} className="text-[#0B57D0]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>

              {/* Profile Link */}
              <NavLink to={ROUTES.PROFILE} onClick={onClose} className={getLinkClass}>
                <User size={20} />
                My Profile
              </NavLink>

              {/* Orders Link */}
              <NavLink to={ROUTES.ORDERS} onClick={onClose} className={getLinkClass}>
                <ShoppingCart size={20} />
                My Orders
              </NavLink>

              {/* Admin Panel - sirf admin role ke liye */}
              {user?.role === "admin" && (
                <NavLink
                  to="/admin/dashboard"
                  onClick={onClose}
                  className={getLinkClass}
                >
                  <LayoutDashboard size={20} />
                  Admin Panel
                </NavLink>
              )}

              {/* Logout Button */}
              <button
                type="button"
                onClick={handleLogout}
                className="
                  mt-2 flex w-full items-center gap-3
                  rounded-xl px-4 py-3
                  text-base font-medium text-red-600
                  transition-colors duration-200
                  hover:bg-red-50
                "
              >
                <LogIn size={20} className="rotate-180" />
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Login Link - user logged in nahi hai */}
              <Link
                to={ROUTES.LOGIN}
                onClick={onClose}
                className="
                  flex items-center gap-3
                  rounded-xl bg-[#0B57D0] px-4 py-3
                  text-base font-semibold text-white
                  transition-colors duration-200
                  hover:bg-blue-700
                "
              >
                <LogIn size={20} />
                Login
              </Link>

              {/* Register Link */}
              <Link
                to={ROUTES.REGISTER}
                onClick={onClose}
                className="
                  mt-2 flex items-center gap-3
                  rounded-xl border border-gray-300 px-4 py-3
                  text-base font-medium text-gray-700
                  transition-colors duration-200
                  hover:bg-gray-100
                "
              >
                <User size={20} />
                Register
              </Link>
            </>
          )}
        </nav>
      </aside>
    </>
  );
};

export default MobileMenu;
