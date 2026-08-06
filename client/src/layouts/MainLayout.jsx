import {Outlet} from "react-router-dom";
import { Navbar } from "./Navbar";

const MainLayout = () => {
  console.log("MainLayout Rendered");

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  );
};
export default MainLayout;