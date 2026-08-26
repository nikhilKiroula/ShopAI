// =====================================================
// SearchBar.jsx
// =====================================================
// Navbar ke andar search input + search button.
//
// Features:
//   - Enter key press pe search navigate karta hai
//   - Search button click pe bhi navigate karta hai
//   - Focus pe blue border highlight
//
// Mobile:
//   - "Search" text hidden, sirf icon show hota hai button mein
//   - Input placeholder chhota hai
// Desktop:
//   - "Search" text bhi button mein dikhta hai
// =====================================================

import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SearchBar = () => {
  const navigate = useNavigate();

  // Search query state
  const [search, setSearch] = useState("");

  // -------------------------------------------------------
  // Search Navigation Helper
  // -------------------------------------------------------
  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <div
      className="
        flex
        h-10
        w-full
        overflow-hidden
        rounded-xl
        border border-gray-300
        bg-white
        shadow-sm
        transition-all duration-200

        sm:h-11
        lg:h-12

        focus-within:border-[#0B57D0]
        focus-within:ring-2
        focus-within:ring-[#0B57D0]/20
      "
    >
      {/* -----------------------------------------------
          Search Input
      ----------------------------------------------- */}
      <div className="flex flex-1 items-center px-3 sm:px-4">
        {/* Search icon */}
        <Search className="mr-2 h-4 w-4 shrink-0 text-gray-400 sm:h-5 sm:w-5" />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            // Enter key se search karo
            if (e.key === "Enter") handleSearch();
          }}
          placeholder="Search products..."
          className="
            w-full
            bg-transparent
            text-sm text-gray-700
            placeholder:text-gray-400
            outline-none

            sm:text-base
          "
        />
      </div>

      {/* -----------------------------------------------
          Search Button
          -----------------------------------------------
          Mobile: sirf icon (sm:px-3)
          Desktop: icon + "Search" text (sm:px-5)
      ----------------------------------------------- */}
      <button
        type="button"
        onClick={handleSearch}
        className="
          flex cursor-pointer items-center justify-center gap-2
          bg-[#0B57D0]
          px-3 text-white
          transition-all duration-200
          hover:bg-blue-700
          active:scale-95

          sm:px-5
          lg:px-6
        "
        aria-label="Search"
      >
        {/* "Search" text - mobile pe hidden */}
        <span className="hidden font-medium sm:block">Search</span>

        {/* Icon - mobile pe search icon dikhao */}
        <Search className="h-4 w-4 sm:hidden" />
      </button>
    </div>
  );
};

export default SearchBar;
