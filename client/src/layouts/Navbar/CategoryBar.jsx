// =====================================================
// CategoryBar.jsx
// =====================================================
// Ye component navbar ke neeche category links
// ki horizontal scrollable bar render karta hai.
//
// Features:
//   - Backend se categories fetch karta hai
//   - Scroll ke saath compact/expanded layout switch
//   - Mobile pe hide ho jaata hai (categories MobileMenu mein hain)
//   - Desktop pe horizontal scrollable bar show hota hai
//
// Props (parent ko expose karta hai):
//   onCategoriesLoad - categories fetch hone pe callback
//                      (MobileMenu ko bhi categories dene ke liye)
// =====================================================

import { useEffect, useCallback, useState } from "react";
import { getCategories } from "@/services/product.service";
import NavLinks from "./NavLinks";

// -------------------------------------------------------
// CategoryBar Component
// -------------------------------------------------------
// Props:
//   onCategoriesLoad - optional callback: categories array
//                      fetch hone ke baad call hoga
// -------------------------------------------------------

const CategoryBar = ({ onCategoriesLoad }) => {
  // Fetched categories store karne ke liye
  const [categories, setCategories] = useState([]);

  // Scroll detection ke liye (compact layout trigger)
  const [isScrolled, setIsScrolled] = useState(false);

  // -------------------------------------------------------
  // Categories Fetch
  // -------------------------------------------------------
  // -------------------------------------------------------
  // onCategoriesLoad ko stable reference banao
  // -------------------------------------------------------
  // useCallback se ensure hota hai ki onCategoriesLoad
  // prop change hone pe fetchCategories re-run na ho
  const stableOnCategoriesLoad = useCallback(
    (data) => {
      if (onCategoriesLoad) onCategoriesLoad(data);
    },
    [onCategoriesLoad],
  );

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);

      // Parent (Navbar.jsx) ko categories pass karo
      // taaki MobileMenu mein bhi show ho sakein
      stableOnCategoriesLoad(data);
    };

    fetchCategories();
  }, [stableOnCategoriesLoad]);

  // -------------------------------------------------------
  // Scroll Detection
  // -------------------------------------------------------
  // 120px se zyada scroll hone pe compact mode on
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 120);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup: component unmount pe listener remove karo
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    // -------------------------------------------------------
    // CategoryBar Container
    // -------------------------------------------------------
    // `hidden md:block` - mobile pe hide, desktop pe show
    // Scroll ke saath py-1 ya py-2 switch hota hai
    <section
      className={`
        hidden
        md:block
        border-b
        border-gray-200
        bg-white
        transition-all
        duration-300
        ${isScrolled ? "py-1" : "py-2"}
      `}
    >
      {/* Max-width container with horizontal scroll */}
      <div
        className="
          mx-auto
          max-w-7xl
          overflow-x-auto
          hide-scrollbar
        "
      >
        {/* -----------------------------------------------
            Navigation Links Row
            -----------------------------------------------
            `min-w-max` ensures scrollable content width.
            `xl:justify-center` centers items on large screens.
        ----------------------------------------------- */}
        <nav
          className={`
            flex
            min-w-max
            items-center
            justify-start
            gap-3
            px-4
            xl:justify-center
            ${
              isScrolled
                ? "gap-4 lg:gap-4 xl:gap-5"
                : "gap-3 lg:gap-5 xl:gap-6"
            }
          `}
        >
          <NavLinks
            categories={categories}
            isScrolled={isScrolled}
          />
        </nav>
      </div>
    </section>
  );
};

export default CategoryBar;