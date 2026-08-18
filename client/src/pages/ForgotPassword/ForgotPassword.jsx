import { Link } from "react-router-dom";
import { useState } from "react";

import {
  AuthLayout,
  AuthInput,
  AuthButton,
} from "@/components/auth";

import ROUTES from "@/constants/routes";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    // Backend Integration Here

    setTimeout(() => {
      setLoading(false);

      console.log(email);
    }, 1000);
  };

  return (
    <AuthLayout
      title="Forgot Password 🔒"
      subtitle="Enter your email to receive a password reset link."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-3"
      >
        <AuthInput
          label="Email Address"
          type="email"
          name="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          placeholder="Enter your email"
          required
        />

        <AuthButton
          type="submit"
          loading={loading}
        >
          Send Reset Link
        </AuthButton>
      </form>

      <p className="mt-5 text-center text-sm text-gray-600">
        Remember your password?{" "}

        <Link
          to={ROUTES.LOGIN}
          className="
            font-semibold
            text-[#0B57D0]
            hover:text-blue-700
          "
        >
          Back to Login
        </Link>
      </p>
    </AuthLayout>
  );
};

export default ForgotPassword;