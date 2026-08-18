import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context";
import toast from "react-hot-toast";

import {
  AuthLayout,
  AuthInput,
  PasswordInput,
  AuthButton,
  SocialLogin,
} from "@/components/auth";

import ROUTES from "@/constants/routes";

import { loginSchema } from "@/validations";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);

    // Backend Integration Here
  };

  return (
    <AuthLayout title="Welcome Back 👋" subtitle="Login to continue shopping.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <AuthInput
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          required
          error={errors.email?.message}
          {...register("email")}
        />

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          required
          error={errors.password?.message}
          {...register("password")}
        />

        {/* Forgot Password */}

        <div className="flex justify-end">
          <Link
            to={ROUTES.FORGOT_PASSWORD}
            className="
              text-sm
              font-medium
              text-[#0B57D0]
              transition-colors
              hover:text-blue-700
            "
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}

        <AuthButton type="submit" loading={isSubmitting}>
          Login
        </AuthButton>
      </form>

      {/* Social Login */}

      <SocialLogin
        onGoogleLogin={() => console.log("Google Login")}
        onGithubLogin={() => console.log("GitHub Login")}
      />

      {/* Register */}

      <p
        className="
          mt-5
          text-center
          text-sm
          text-gray-600
        "
      >
        Don't have an account?{" "}
        <Link
          to={ROUTES.REGISTER}
          className="
            font-semibold
            text-[#0B57D0]
            transition-colors
            hover:text-blue-700
          "
        >
          Create Account
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
