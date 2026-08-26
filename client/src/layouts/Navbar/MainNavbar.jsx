// =====================================================
// MainNavbar.jsx
// =====================================================
// Ye main navbar component hai jo Logo, SearchBar
// aur NavActions (Cart, Wishlist, Account) render
// karta hai.
//
// Mobile pe:
//   - Hamburger button show hota hai (left side)
//   - MobileMenu open hoti hai is button se
//
// Desktop pe:
//   - Normal layout: Logo | SearchBar | NavActions
// =====================================================

import { Menu } from "lucide-react";
import { Logo, SearchBar, NavActions } from "./";

// -------------------------------------------------------
// MainNavbar Component
// -------------------------------------------------------
// Props:
//   onMenuOpen - function: mobile menu open karne ka callback
// -------------------------------------------------------

const MainNavbar = ({ onMenuOpen }) => {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div
        className="
          mx-auto
          flex
          h-16
          max-w-7xl
          items-center
          gap-3
          px-4

          md:h-20
          md:gap-5
          md:px-6
        "
      >
        {/* -----------------------------------------------
            Hamburger Button (Mobile Only)
            -----------------------------------------------
            `md:hidden` se sirf mobile pe visible hoga.
            Click karne pe parent se mila onMenuOpen()
            function call hoga jo MobileMenu open karga.
        ----------------------------------------------- */}
        <button
          type="button"
          onClick={onMenuOpen}
          className="
            flex h-9 w-9 shrink-0 items-center justify-center
            rounded-xl
            text-gray-700
            transition-colors duration-200
            hover:bg-gray-100 hover:text-gray-900

            md:hidden
          "
          aria-label="Open navigation menu"
        >
          <Menu size={24} />
        </button>

        {/* -----------------------------------------------
            Logo
            -----------------------------------------------
            Desktop pe logo normally show hoga.
            Mobile pe hamburger ke baad show hoga.
        ----------------------------------------------- */}
        <Logo />

        {/* -----------------------------------------------
            Search Bar
            -----------------------------------------------
            `flex-1 min-w-0` se available space
            mein expand ho jaata hai.
        ----------------------------------------------- */}
        <div className="flex-1 min-w-0">
          <SearchBar />
        </div>

        {/* -----------------------------------------------
            Nav Actions: Cart, Wishlist, Account
            -----------------------------------------------
            Mobile pe icon-only dikhega (label hidden).
            Desktop pe icon + label dono dikhenge.
        ----------------------------------------------- */}
        <NavActions />
      </div>
    </nav>
  );
};

export default MainNavbar;