const AuthInput = ({
  label,
  error,
  required = false,
  ...props
}) => {
  return (
    <div className="mb-3">
      <label
        htmlFor={props.name}
        className="
          mb-2
          block
          text-sm
          font-medium
          text-gray-700
        "
      >
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <input
        {...props}
        className={`
          w-full
          rounded-xl
          border
          px-4
          py-2.5
          text-gray-800
          outline-none
          transition-all
          duration-200

          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
              : "border-gray-300 focus:border-[#0B57D0] focus:ring-2 focus:ring-[#0B57D0]/20"
          }
        `}
      />

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default AuthInput;