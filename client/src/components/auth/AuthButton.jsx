const AuthButton = ({
  children,
  type = "button",
  onClick,
  loading = false,
  disabled = false,
  fullWidth = true,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${
          fullWidth ? "w-full" : ""
        }

        flex
        cursor-pointer
        items-center
        justify-center
        rounded-xl
        bg-[#0B57D0]
        px-5
        py-3.5
        text-base
        font-semibold
        text-white

        transition-all
        duration-300

        hover:bg-blue-700
        hover:shadow-lg

        active:scale-95

        disabled:cursor-not-allowed
        disabled:bg-gray-400
        disabled:hover:shadow-none
        disabled:active:scale-100
      `}
    >
      {loading ? (
        <div
          className="
            h-5
            w-5
            animate-spin
            rounded-full
            border-2
            border-white
            border-t-transparent
          "
        />
      ) : (
        children
      )}
    </button>
  );
};

export default AuthButton;