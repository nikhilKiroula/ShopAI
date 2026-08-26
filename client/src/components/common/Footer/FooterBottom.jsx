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

      <p className="text-sm text-gray-500">
        Built with MERN Stack
      </p>
    </div>
  );
};

export default FooterBottom;