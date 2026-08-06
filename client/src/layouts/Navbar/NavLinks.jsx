import { NavLink } from "react-router-dom";
import { NAV_LINKS } from "@/constants/navbar.config";

const NavLinks = ({ isScrolled }) => {
  return (
    <>
      {NAV_LINKS.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.id}
            to={
              item.category
                ? `${item.path}?category=${encodeURIComponent(item.category)}`
                : `${item.path}?category=${encodeURIComponent(item.label.toLowerCase())}`
            }
            className="group relative shrink-0"
          >
            {({ isActive }) => (
              <div
                className={`
                  flex
                  items-center
                  justify-center
                  transition-all
                  duration-300

                  ${
                    isScrolled
                      ? "gap-1.5 px-1.5 py-2"
                      : "flex-col gap-1 px-2 py-1"
                  }
                `}
              >
                <div
                  className={`
                    flex
                    items-center
                    justify-center
                    rounded-xl
                    transition-all
                    duration-300

                    ${isScrolled ? "h-7 w-7" : "h-11 w-11"}

                    ${isActive ? "bg-blue-100" : "group-hover:bg-gray-100"}
                  `}
                >
                  <Icon
                    className={`
                      transition-all
                      duration-300

                      ${isScrolled ? "h-4 w-4" : "h-6 w-6"}
                    `}
                  />
                </div>

                <span
                  className={`
                    whitespace-nowrap
                    font-medium
                    transition-all
                    duration-300

                    ${isScrolled ? "text-sm" : "text-xs"}

                    ${
                      isActive
                        ? "text-black"
                        : "text-gray-700 group-hover:text-black"
                    }
                  `}
                >
                  {item.label}
                </span>

                {isActive && (
                  <span
                    className="
                      absolute
                      -bottom-2
                      left-1/2
                      h-[3px]
                      w-10
                      -translate-x-1/2
                      rounded-full
                      bg-[#0B57D0]
                    "
                  />
                )}
              </div>
            )}
          </NavLink>
        );
      })}
    </>
  );
};

export default NavLinks;
