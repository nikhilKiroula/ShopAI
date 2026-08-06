import { Menu } from "lucide-react";
import NavLinks from "./NavLinks";

const CategoryBar = () => {
  return (
    <div className="hidden border-b border-gray-200 bg-white lg:block">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-6 px-6">

        <button
          type="button"
          className="
            flex
            items-center
            gap-2
            rounded-lg
            bg-yellow-400
            px-5
            py-2
            font-medium
            text-gray-900
            hover:bg-yellow-500
            transition-colors
          "
        >
          <Menu className="h-5 w-5" />
          All Categories
        </button>

        <div className="flex items-center gap-6 overflow-x-auto">
          <NavLinks />
        </div>

      </div>
    </div>
  );
};

export default CategoryBar;