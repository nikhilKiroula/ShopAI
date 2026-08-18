import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = ({
  label,
  error,
  required = false,
  ...props
}) => {
  const [showPassword, setShowPassword] =
    useState(false);

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

      <div className="relative">
        <input
          {...props}
          type={
            showPassword ? "text" : "password"
          }
          className={`
            w-full
            rounded-xl
            border
            py-2.5
            pl-4
            pr-12
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

        <button
          type="button"
          onClick={() =>
            setShowPassword(!showPassword)
          }
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            cursor-pointer
            text-gray-500
            transition-colors
            hover:text-[#0B57D0]
          "
        >
          {showPassword ? (
            <EyeOff size={20} />
          ) : (
            <Eye size={20} />
          )}
        </button>
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default PasswordInput;