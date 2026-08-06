import { Heart, ShoppingCart } from "lucide-react";
import ROUTES from "@/constants/routes";

import ActionItem from "./ActionItem";
import UserMenu from "./UserMenu";

const NavActions = () => {
  return (
    <div className="flex items-center gap-3 md:gap-6">
      <ActionItem
        to={ROUTES.WISHLIST}
        icon={Heart}
        label="Wishlist"
        badgeCount={2}
      />

      <ActionItem
        to={ROUTES.CART}
        icon={ShoppingCart}
        label="Cart"
        badgeCount={3}
      />

      <UserMenu />
    </div>
  );
};

export default NavActions;