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
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-6">

        {/* Left */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Truck className="h-4 w-4 text-blue-600" />
          <span>Free Delivery on Orders ₹999+</span>
        </div>

        {/* Center */}
        <div className="hidden items-center gap-2 text-sm font-medium md:flex">
          <Zap className="h-4 w-4 text-yellow-500" />
          <span>
            Mega Sale is Live! Up to{" "}
            <span className="font-semibold text-blue-600">
              50% OFF
            </span>
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-5 text-sm text-gray-600">

          <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
            <CircleHelp className="h-4 w-4" />
            Help
          </button>

          <button className="hidden items-center gap-1 hover:text-blue-600 transition-colors md:flex">
            <MapPinned className="h-4 w-4 text-red-500" />
            Track Order
          </button>

          <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
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