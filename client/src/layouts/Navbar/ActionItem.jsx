import { Link } from "react-router-dom";

const ActionItem = ({
  to = "/",
  icon: Icon,
  label,
  badgeCount = 0,
}) => {
  return (
    <Link
      to={to}
      className="
        group
        relative
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
      {/* Icon */}
      <div className="relative">
        <Icon className="h-5 w-5 md:h-6 md:w-6" />

        {badgeCount > 0 && (
          <span
            className="
              absolute
              -top-2
              -right-2
              flex
              h-5
              w-5
              items-center
              justify-center
              rounded-full
              bg-red-500
              text-[10px]
              font-semibold
              text-white
            "
          >
            {badgeCount}
          </span>
        )}
      </div>

      {/* Label */}
      <span className="hidden text-xs font-medium md:block">
        {label}
      </span>
    </Link>
  );
};

export default ActionItem;