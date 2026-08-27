import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

import {
  AuthLayout,
  AuthInput,
  AuthButton,
} from "@/components/auth";

import api from "@/services/api.service";
import ROUTES from "@/constants/routes";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/forgot-password", {
        email: email.trim(),
      });

      toast.success(
        response.data?.message ||
          "Password reset link sent to your email"
      );

      setSubmitted(true);
    } catch (error) {
      console.error("Forgot password error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to send reset link. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Forgot Password 🔒"
      subtitle={
        submitted
          ? "Check your email for the password reset link."
          : "Enter your email to receive a password reset link."
      }
    >
      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <AuthInput
            label="Email Address"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
      ) : (
        <div className="rounded-lg bg-green-50 p-4 text-center">
          <p className="text-sm text-green-700">
            If an account exists with this email,
            you will receive a password reset link
            shortly.
          </p>

          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="
              mt-3
              cursor-pointer
              text-sm
              font-semibold
              text-[#0B57D0]
              hover:text-blue-700
            "
          >
            Try another email
          </button>
        </div>
      )}

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