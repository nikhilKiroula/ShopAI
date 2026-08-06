import {Outlet} from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "@/components/common/Footer";

const MainLayout = () => {
  console.log("MainLayout Rendered");

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
export default MainLayout;