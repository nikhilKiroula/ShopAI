import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

import {
  AuthLayout,
  AuthInput,
  AuthButton,
} from "@/components/auth";

import api from "@/services/api.service";
import ROUTES from "@/constants/routes";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!token) {
      toast.error("Invalid or missing reset token");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        `/auth/reset-password/${token}`,
        {
          password,
        }
      );

      toast.success(
        response.data?.message ||
          "Password reset successfully"
      );

      setPassword("");
      setConfirmPassword("");

      // Redirect user to login
      setTimeout(() => {
        navigate(ROUTES.LOGIN);
      }, 1000);
    } catch (error) {
      console.error("Reset password error:", error);

      toast.error(
        error.response?.data?.message ||
          "Password reset failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset Password 🔐"
      subtitle="Create a new password for your account."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <AuthInput
          label="New Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          placeholder="Enter new password"
          required
        />

        <AuthInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
          placeholder="Confirm new password"
          required
        />

        <AuthButton
          type="submit"
          loading={loading}
        >
          Reset Password
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

export default ResetPassword;