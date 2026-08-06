import { Link } from "react-router-dom";
import logo from "@/assets/images/logo.png";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 shrink-0">
      <img
        src={logo}
        alt="ShopAI Logo"
        className="
    h-10
    w-auto

    sm:h-11
    md:h-12
    lg:h-14
  "
      />
    </Link>
  );
};

export default Logo;
