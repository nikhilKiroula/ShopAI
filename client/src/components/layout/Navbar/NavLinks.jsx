import { NavLink } from "react-router-dom";
import { NAV_LINKS } from "@/constants/navbar.config";

const NavLinks = () => {
  return (
    <>
      {NAV_LINKS.map((item) => (
        <NavLink
          key={item.label}
          to={item.path}
          className={({ isActive }) =>
            `
            px-3
            py-2
            text-sm
            font-medium
            whitespace-nowrap
            transition-colors
            duration-200

            ${
              item.isDeal
                ? "text-red-500 hover:text-red-600"
                : "text-gray-700 hover:text-blue-600"
            }

            ${isActive ? "text-blue-600" : ""}
          `
          }
        >
          {item.label}
        </NavLink>
      ))}
    </>
  );
};

export default NavLinks;