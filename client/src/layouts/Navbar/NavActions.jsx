import { Heart, ShoppingCart } from "lucide-react";
import ROUTES from "@/constants/routes";

import ActionItem from "./ActionItem";
import UserMenu from "./UserMenu";
import { useCart } from "@/context";
import { useWishlist } from "@/context";

const NavActions = () => {
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  return (
    <div className="flex items-center gap-3 md:gap-6">
      <ActionItem
        to={ROUTES.WISHLIST}
        icon={Heart}
        label="Wishlist"
        badgeCount={wishlistItems.length}
      />

      <ActionItem
        to={ROUTES.CART}
        icon={ShoppingCart}
        label="Cart"
        badgeCount={cartCount}
      />

      <UserMenu />
    </div>
  );
};

export default NavActions;
