import { Navigate } from "react-router-dom";

import { useAuth } from "@/context";
import ROUTES from "@/constants/routes";

const AdminRoute = ({ children }) => {
  // Get currently logged-in user from AuthContext
  const { user } = useAuth();

  // If user is not logged in,
  // send them to the login page. 
  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  // If logged-in user is not an admin,
  // don't allow access to admin pages.
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // User is authenticated and has admin role,
  // so allow access to the admin page.
  return children;
};

export default AdminRoute;