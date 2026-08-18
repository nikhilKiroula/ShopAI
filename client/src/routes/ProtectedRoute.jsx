import { Navigate } from "react-router-dom";

import ROUTES from "@/constants/routes";
import { useAuth } from "@/context";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Wait until authentication check is completed
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  // User is not authenticated
  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        replace
      />
    );
  }

  // User is authenticated
  return children;
};

export default ProtectedRoute;