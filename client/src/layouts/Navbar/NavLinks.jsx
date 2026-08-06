import { NavLink } from "react-router-dom";
import { NAV_LINKS } from "@/constants/navbar.config";

const NavLinks = () => {
  return (
    <>
      {NAV_LINKS.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `
                group
                relative
                flex
                min-w-19.5
                flex-col
                items-center
                justify-center
                gap-1
                py-2
                transition-all
                duration-200
                select-none
              `
            }
          >
            {({ isActive }) => (
              <>
                {/* Icon */}
                <div
                  className={`
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    transition-all
                    duration-200

                    ${
                      isActive
                        ? "bg-blue-100"
                        : "group-hover:bg-gray-100"
                    }
                  `}
                >
                  <Icon
                    className="
                      h-6
                      w-6
                      text-gray-800
                      transition-colors
                      duration-200
                    "
                  />
                </div>

                {/* Label */}
                <span
                  className={`
                    whitespace-nowrap
                    text-xs
                    font-medium
                    transition-colors
                    duration-200

                    ${
                      isActive
                        ? "text-black"
                        : "text-gray-700 group-hover:text-black"
                    }
                  `}
                >
                  {item.label}
                </span>

                {/* Active Bottom Line */}
                {isActive && (
                  <span
                    className="
                      absolute
                      -bottom-2.25
                      h-0.75
                      w-14
                      rounded-full
                      bg-blue-600
                    "
                  />
                )}
              </>
            )}
          </NavLink>
        );
      })}
    </>
  );
};

export default NavLinks;