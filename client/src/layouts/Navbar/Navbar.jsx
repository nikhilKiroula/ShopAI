import { TopBar, MainNavbar, CategoryBar } from "./";

const Navbar = () => {
  return (
    <>
  <TopBar />

  <div
    className="
      sticky
      top-0
      z-50
      bg-white
      shadow-sm
    "
  >
    <MainNavbar />
    <CategoryBar />
  </div>
</>
  );
};

export default Navbar;