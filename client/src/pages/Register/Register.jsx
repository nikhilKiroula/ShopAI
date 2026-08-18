import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  AuthLayout,
  AuthInput,
  PasswordInput,
  AuthButton,
  SocialLogin,
} from "@/components/auth";

import ROUTES from "@/constants/routes";
import { registerSchema } from "@/validations";

const Register = () => {
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
    console.log(data);

    // Backend Integration Here
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