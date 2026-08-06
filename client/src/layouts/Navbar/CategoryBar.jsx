import { useEffect, useState } from "react";

import NavLinks from "./NavLinks";

const CategoryBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 120);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
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
            transition-all
            duration-300

            xl:justify-center

            ${isScrolled ? "gap-4 lg:gap-4 xl:gap-5" : "gap-3 lg:gap-5 xl:gap-6"}
          `}
        >
          <NavLinks isScrolled={isScrolled} />
        </nav>
      </div>
    </section>
  );
};

export default CategoryBar;