import { Link } from "react-router-dom";
import ROUTES from "@/constants/routes";

const FooterTop = () => {
  return (
    <div
      className="
        flex
        flex-col
        gap-8
        border-b
        border-gray-800
        pb-10
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      <div className="max-w-xl">
        <Link
          to={ROUTES.HOME}
          className="text-3xl font-bold text-white"
        >
          Shop<span className="text-[#0B57D0]">AI</span>
        </Link>

        <p className="mt-4 leading-7 text-gray-400">
          Your one-stop shopping destination for quality
          products, secure payments and a seamless
          shopping experience.
        </p>
      </div>
    </div>
  );
};

export default FooterTop;