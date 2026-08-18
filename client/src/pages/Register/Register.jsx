import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import {
  AuthLayout,
  AuthInput,
  PasswordInput,
  AuthButton,
  SocialLogin,
} from "@/components/auth";

import ROUTES from "@/constants/routes";
import { registerSchema } from "@/validations";
import { registerUser } from "../../services/auth.service.js";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await registerUser({
        name: data.fullName,
        email: data.email,
        password: data.password,
      });

      toast.success(
        response.message || "Account created successfully!"
      );

      navigate(ROUTES.LOGIN);
    } catch (error) {
      console.error("Registration error:", error);

      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <AuthLayout
      title="Create Account 🚀"
      subtitle="Join ShopAI and start shopping today."
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3"
      >
        <AuthInput
          label="Full Name"
          placeholder="Enter your full name"
          required
          error={errors.fullName?.message}
          {...register("fullName")}
        />

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
          placeholder="Create a password"
          required
          error={errors.password?.message}
          {...register("password")}
        />

        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm your password"
          required
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <AuthButton
          type="submit"
          loading={isSubmitting}
        >
          Create Account
        </AuthButton>
      </form>

      <SocialLogin
        onGoogleLogin={() =>
          console.log("Google Register")
        }
        onGithubLogin={() =>
          console.log("GitHub Register")
        }
      />

      <p
        className="
          mt-5
          text-center
          text-sm
          text-gray-600
        "
      >
        Already have an account?{" "}

        <Link
          to={ROUTES.LOGIN}
          className="
            font-semibold
            text-[#0B57D0]
            transition-colors
            hover:text-blue-700
          "
        >
          Login
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;