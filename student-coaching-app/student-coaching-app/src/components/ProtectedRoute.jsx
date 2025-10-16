import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  // 🔹 If no user is logged in, redirect to SignIn page
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // 🔹 If the user's role is not in the allowed list, block access
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 🔹 Otherwise, allow access
  return children;
}
