import {
  FaGithub,
  FaGoogle,
} from "react-icons/fa";

const SocialLogin = ({
  onGoogleLogin,
  onGithubLogin,
}) => {
  return (
    <>
      {/* Divider */}

      <div className="my-8 flex items-center">
        <div className="h-px flex-1 bg-gray-300" />

        <span
          className="
            px-4
            text-sm
            font-medium
            text-gray-500
          "
        >
          OR
        </span>

        <div className="h-px flex-1 bg-gray-300" />
      </div>

      {/* Social Buttons */}

      <div className="space-y-4">
        {/* Google */}

        <button
          type="button"
          onClick={onGoogleLogin}
          className="
            flex
            w-full
            cursor-pointer
            items-center
            justify-center
            gap-3
            rounded-xl
            border
            border-gray-300
            bg-white
            py-3.5
            font-medium
            text-gray-700
            transition-all
            duration-300

            hover:border-[#0B57D0]
            hover:bg-blue-50
            hover:text-[#0B57D0]

            active:scale-95
          "
        >
          <FaGoogle className="text-lg text-red-500" />

          Continue with Google
        </button>

        {/* GitHub */}

        <button
          type="button"
          onClick={onGithubLogin}
          className="
            flex
            w-full
            cursor-pointer
            items-center
            justify-center
            gap-3
            rounded-xl
            border
            border-gray-300
            bg-white
            py-3.5
            font-medium
            text-gray-700
            transition-all
            duration-300

            hover:border-[#0B57D0]
            hover:bg-gray-100

            active:scale-95
          "
        >
          <FaGithub className="text-lg" />

          Continue with GitHub
        </button>
      </div>
    </>
  );
};

export default SocialLogin;