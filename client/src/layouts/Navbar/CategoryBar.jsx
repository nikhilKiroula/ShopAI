import NavLinks from "./NavLinks";

const CategoryBar = () => {
  return (
    <section className="border-b border-gray-200 bg-white">
      <div
        className="
          mx-auto
          max-w-7xl
          overflow-x-auto
          hide-scrollbar
        "
      >
        <nav
          className="
            flex
            items-center
            justify-start
            xl:justify-center
            gap-3
            lg:gap-5
            px-4
            py-2
            min-w-max
          "
        >
          <NavLinks />
        </nav>
      </div>
    </section>
  );
};

export default CategoryBar;