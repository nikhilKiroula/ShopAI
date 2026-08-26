import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "@/components/common/Footer";
import ScrollToTop from "../components/common/ScrollToTop";

const MainLayout = () => {
  console.log("MainLayout Rendered");

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
export default MainLayout;
