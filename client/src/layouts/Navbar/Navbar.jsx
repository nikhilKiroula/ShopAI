// =====================================================
// Navbar.jsx
// =====================================================
// Ye main Navbar wrapper component hai.
//
// Structure:
//   Navbar
//     ├── TopBar       (announcement bar - mobile pe hidden)
//     ├── MainNavbar   (logo + search + actions + hamburger)
//     ├── CategoryBar  (desktop category links)
//     └── MobileMenu   (mobile sliding drawer)
//
// State:
//   isMobileMenuOpen - boolean: mobile menu open/close track
//   categories       - array: CategoryBar se fetch ki hui list
//                      (MobileMenu ko share karni hoti hai)
// =====================================================

import { useState } from "react";
import { TopBar, MainNavbar, CategoryBar } from "./";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  // -------------------------------------------------------
  // Mobile Menu State
  // -------------------------------------------------------
  // isMobileMenuOpen: true hone pe drawer slide-in hota hai
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // -------------------------------------------------------
  // Shared Categories State
  // -------------------------------------------------------
  // CategoryBar se fetch hone ke baad categories yahan store
  // hoti hain taaki MobileMenu ko bhi pass kar sakein
  const [categories, setCategories] = useState([]);

  // -------------------------------------------------------
  // Handlers
  // -------------------------------------------------------

  // Mobile menu open karo
  const handleMenuOpen = () => setIsMobileMenuOpen(true);

  // Mobile menu band karo
  const handleMenuClose = () => setIsMobileMenuOpen(false);

  // CategoryBar se categories milne pe yahan store karo
  const handleCategoriesLoad = (loadedCategories) => {
    setCategories(loadedCategories);
  };

  return (
    <>
      {/* ---------------------------------------------------
          TopBar
          ---------------------------------------------------
          Free delivery, sale announcement, help links.
          Mobile pe hide hoti hai (TopBar ke andar hidden hai).
      --------------------------------------------------- */}
      <TopBar />

      {/* ---------------------------------------------------
          Sticky Wrapper
          ---------------------------------------------------
          `sticky top-0 z-50` se scroll pe upar chipak jaata hai.
          Dono components (MainNavbar + CategoryBar) ek saath
          sticky rahein isliye ek div mein wrap kiya hai.
      --------------------------------------------------- */}
      <div
        className="
          sticky
          top-0
          z-50
          bg-white
          shadow-sm
        "
      >
        {/* MainNavbar: Logo + Search + Actions + Hamburger */}
        <MainNavbar onMenuOpen={handleMenuOpen} />

        {/* CategoryBar: Desktop category links
            onCategoriesLoad se categories Navbar ko milti hain */}
        <CategoryBar onCategoriesLoad={handleCategoriesLoad} />
      </div>

      {/* ---------------------------------------------------
          MobileMenu (Sliding Drawer)
          ---------------------------------------------------
          Ye sirf mobile pe kaam aata hai.
          isOpen prop se drawer control hoti hai.
          categories prop se menu mein categories show hoti hain.
      --------------------------------------------------- */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={handleMenuClose}
        categories={categories}
      />
    </>
  );
};

export default Navbar;