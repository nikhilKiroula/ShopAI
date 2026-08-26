// =====================================================
// TopBar.jsx
// =====================================================
// Navbar ke sabse upar announcement bar.
// Free delivery info, sale announcement, help links.
//
// Mobile:
//   - Sirf "Free Delivery" text show hota hai
//   - Center sale text aur Track Order hidden hote hain
// Desktop:
//   - Teeno sections visible hote hain
// =====================================================

import {
  Truck,
  Zap,
  CircleHelp,
  MapPinned,
  Globe,
  ChevronDown,
} from "lucide-react";

const TopBar = () => {
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 sm:px-6">

        {/* -----------------------------------------------
            Left: Free Delivery Info
            -----------------------------------------------
            Har screen size pe visible rahega
        ----------------------------------------------- */}
        <div className="flex items-center gap-2 text-xs text-gray-600 sm:text-sm">
          <Truck className="h-3.5 w-3.5 text-blue-600 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">
            Free Delivery on Orders ₹999+
          </span>
          <span className="sm:hidden">Free Delivery on ₹999+</span>
        </div>

        {/* -----------------------------------------------
            Center: Sale Announcement
            -----------------------------------------------
            Mobile pe hide (`hidden md:flex`)
        ----------------------------------------------- */}
        <div className="hidden items-center gap-2 text-sm font-medium md:flex">
          <Zap className="h-4 w-4 text-yellow-500" />
          <span>
            Mega Sale is Live! Up to{" "}
            <span className="font-semibold text-blue-600">50% OFF</span>
          </span>
        </div>

        {/* -----------------------------------------------
            Right: Help, Track, Language
            -----------------------------------------------
            Mobile pe sirf Help button dikhta hai
        ----------------------------------------------- */}
        <div className="flex items-center gap-3 text-xs text-gray-600 sm:gap-5 sm:text-sm">

          {/* Help */}
          <button className="flex items-center gap-1 transition-colors hover:text-blue-600">
            <CircleHelp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>Help</span>
          </button>

          {/* Track Order - mobile pe hidden */}
          <button className="hidden items-center gap-1 transition-colors hover:text-blue-600 md:flex">
            <MapPinned className="h-4 w-4 text-red-500" />
            Track Order
          </button>

          {/* Language Selector - mobile pe hidden */}
          <button className="hidden items-center gap-1 transition-colors hover:text-blue-600 sm:flex">
            <Globe className="h-4 w-4" />
            EN
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;