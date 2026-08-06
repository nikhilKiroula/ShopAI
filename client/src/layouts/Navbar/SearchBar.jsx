import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SearchBar = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  return (
    <div
      className="
        flex
        h-11
        w-full
        overflow-hidden
        rounded-xl
        border
        border-gray-300
        bg-white
        shadow-sm
        transition-all
        duration-200

        sm:h-12
        lg:h-14

        focus-within:border-[#0B57D0]
        focus-within:ring-2
        focus-within:ring-[#0B57D0]/20
      "
    >
      {/* Search Input */}

      <div className="flex flex-1 items-center px-3 sm:px-4 lg:px-5">
        <Search
          className="
            mr-2
            h-5
            w-5
            shrink-0
            text-gray-400
          "
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigate(`/products?search=${encodeURIComponent(search)}`);
            }
          }}
          placeholder="Search for products, brands and more..."
          className="
    w-full
    bg-transparent
    text-sm
    text-gray-700
    placeholder:text-gray-400
    outline-none

    sm:text-base
  "
        />
      </div>

      {/* Search Button */}

      <button
        type="button"
        onClick={() =>
          navigate(`/products?search=${encodeURIComponent(search)}`)
        }
        className="
          flex
          cursor-pointer
          items-center
          justify-center
          gap-2
          bg-[#0B57D0]
          px-4
          text-white
          transition-all
          duration-200
          hover:bg-blue-700
          active:scale-95

          sm:px-5
          lg:px-6
        "
      >
        {/* <Search className="h-5 w-5" /> */}

        <span className="hidden md:block font-medium">Search</span>
      </button>
    </div>
  );
};

export default SearchBar;
