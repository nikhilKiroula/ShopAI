import { Search, ChevronDown } from "lucide-react";

const SearchBar = () => {
  return (
    <div
      className="
        flex
        h-11 
        w-full
        overflow-hidden
        rounded-xl
        border border-gray-300
        bg-white
        transition-all
        duration-200

        sm:h-12
        md:h-14

        focus-within:border-blue-500
        focus-within:ring-2
        focus-within:ring-blue-100
      "
    >
      {/* Category Button (Desktop Only) */}
      <button
        type="button"
        className="
          hidden
          lg:flex
          items-center
          gap-2
          border-r
          border-gray-300
          px-5
          text-sm
          font-medium
          text-gray-700
          transition-colors
          duration-200
          hover:bg-gray-50
        "
      >
        <span>All Categories</span>

        <ChevronDown className="h-4 w-4" />
      </button>

      {/* Input */}

      <div className="flex flex-1 items-center px-4">
        <Search className="mr-3 h-5 w-5 text-gray-400" />

        <input
          type="text"
          placeholder="Search for products, brands and more..."
          className="
            w-full
            bg-transparent
            text-sm
            text-gray-700
            placeholder:text-gray-400
            outline-none
          "
        />
      </div>

      {/* Search Button */}

      <button
        type="button"
        className="
          flex
          items-center
          justify-center
          bg-blue-600
          px-3 
          sm:px-4 
          md:px-5
          text-white
          transition-colors
          duration-200
          hover:bg-blue-700
        "
      >
        <Search className="h-5 w-5" />
      </button>
    </div>
  );
};

export default SearchBar;
