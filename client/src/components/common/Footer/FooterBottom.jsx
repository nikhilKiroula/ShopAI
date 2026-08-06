const FooterBottom = () => {
  return (
    <div
      className="
        flex
        flex-col
        gap-4
        border-t
        border-gray-800
        pt-6

        md:flex-row
        md:items-center
        md:justify-between
      "
    >
      <p className="text-sm text-gray-500">
        © 2026 ShopAI. All rights reserved.
      </p>

      <div className="flex gap-6 text-sm text-gray-400">
        <button className="cursor-pointer hover:text-white">
          Privacy
        </button>

        <button className="cursor-pointer hover:text-white">
          Terms
        </button>

        <button className="cursor-pointer hover:text-white">
          Cookies
        </button>
      </div>
    </div>
  );
};

export default FooterBottom;