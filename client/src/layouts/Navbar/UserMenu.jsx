import { User, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

import ROUTES from "@/constants/routes";
import { useAuth } from "@/context";

const UserMenu = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Link
      to={isAuthenticated ? ROUTES.PROFILE : ROUTES.LOGIN}
      className="
        group
        flex
        flex-col
        items-center
        justify-center
        gap-1
        text-gray-700
        transition-colors
        duration-200
        hover:text-blue-600
      "
    >
      <div className="flex items-center gap-1">
        <User className="h-5 w-5 md:h-6 md:w-6" />
        <ChevronDown className="hidden h-4 w-4 lg:block" />
      </div>

      <span className="hidden text-xs font-medium md:block">
        Account
      </span>
    </Link>
    
  );
};

export default UserMenu;