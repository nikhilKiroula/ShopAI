const SectionHeader = ({
  title,
  subtitle,
  onViewAll,
}) => {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">
          {title}
        </h2>

        <p className="mt-1 text-gray-500">
          {subtitle}
        </p>
      </div>

      <button
        type="button"
        onClick={onViewAll}
        className="
          cursor-pointer
          rounded-lg
          border
          border-[#0B57D0]
          px-5
          py-2
          text-sm
          font-semibold
          text-[#0B57D0]
          transition-all
          duration-200
          hover:bg-[#0B57D0]
          hover:text-white
          active:scale-95
        "
      >
        View All
      </button>
    </div>
  );
};

export default SectionHeader;