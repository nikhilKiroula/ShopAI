import { useEffect, useState } from "react";
import { getCategories } from "@/services/product.service";
import NavLinks from "./NavLinks";

const CategoryBar = () => {
    const [categories, setCategories] = useState([]);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getCategories();
            setCategories(data);
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 120);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <section
            className={`
                border-b
                border-gray-200
                bg-white
                transition-all
                duration-300
                ${isScrolled ? "py-1" : "py-2"}
            `}
        >
            <div
                className="
                    mx-auto
                    max-w-7xl
                    overflow-x-auto
                    hide-scrollbar
                "
            >
                <nav
                    className={`
                        flex
                        min-w-max
                        items-center
                        justify-start
                        gap-3
                        px-4
                        xl:justify-center
                        ${
                            isScrolled
                                ? "gap-4 lg:gap-4 xl:gap-5"
                                : "gap-3 lg:gap-5 xl:gap-6"
                        }
                    `}
                >
                    <NavLinks
                        categories={categories}
                        isScrolled={isScrolled}
                    />
                </nav>
            </div>
        </section>
    );
};

export default CategoryBar;