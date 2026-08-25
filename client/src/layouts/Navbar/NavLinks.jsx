import { NavLink } from "react-router-dom";
import {
    Laptop,
    Gem,
    Shirt,
    ShoppingBag,
    Smartphone,
    House,
    Brush,
    Tv,
    Dumbbell,
    BookOpen,
    Gamepad2,
    Gift,
    Package,
} from "lucide-react";

const getCategoryIcon = (category) => {
    const value = category.toLowerCase();

    if (value.includes("electronic")) return Laptop;
    if (value.includes("jewel")) return Gem;
    if (value.includes("men")) return Shirt;
    if (value.includes("women")) return ShoppingBag;
    if (value.includes("mobile")) return Smartphone;
    if (value.includes("home")) return House;
    if (value.includes("beauty")) return Brush;
    if (value.includes("appliance")) return Tv;
    if (value.includes("sport")) return Dumbbell;
    if (value.includes("book")) return BookOpen;
    if (value.includes("gaming")) return Gamepad2;
    if (value.includes("offer")) return Gift;

    return Package;
};

const formatCategoryName = (category) => {
    return category
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

const NavLinks = ({ categories, isScrolled }) => {
    return (
        <>
            {categories.map((category) => {
                const Icon = getCategoryIcon(category);

                return (
                    <NavLink
                        key={category}
                        to={`/products?category=${encodeURIComponent(category)}`}
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
                                        ${
                                            isScrolled
                                                ? "h-7 w-7"
                                                : "h-11 w-11"
                                        }
                                        ${
                                            isActive
                                                ? "bg-blue-100"
                                                : "group-hover:bg-gray-100"
                                        }
                                    `}
                                >
                                    <Icon
                                        className={`
                                            transition-all
                                            duration-300
                                            ${
                                                isScrolled
                                                    ? "h-4 w-4"
                                                    : "h-6 w-6"
                                            }
                                        `}
                                    />
                                </div>

                                <span
                                    className={`
                                        whitespace-nowrap
                                        font-medium
                                        transition-all
                                        duration-300
                                        ${
                                            isScrolled
                                                ? "text-sm"
                                                : "text-xs"
                                        }
                                        ${
                                            isActive
                                                ? "text-black"
                                                : "text-gray-700 group-hover:text-black"
                                        }
                                    `}
                                >
                                    {formatCategoryName(category)}
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