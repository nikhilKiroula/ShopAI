import { Logo, SearchBar, NavActions } from "./";

const MainNavbar = () => {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div
        className="
          mx-auto
          flex
          h-20
          max-w-7xl
          items-center
          gap-3
          px-4

          md:gap-5
          md:px-6
        "
      >
        {/* Logo */}
        <Logo />

        {/* Search */}
        <div className="flex-1 min-w-0">
          <SearchBar />
        </div>

        {/* Actions */}
        <NavActions />
      </div>
    </nav>
  );
};

export default MainNavbar;