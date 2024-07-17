import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/login.service";

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export default function PrivateRoute({
  children,
}: //requiredRole,
PrivateRouteProps) {
  const user = getCurrentUser();

  if (!user || Object.keys(user).length === 0) {
    return <Navigate to="/login" replace />;
  }

  /*if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }*/

  return children;
}
