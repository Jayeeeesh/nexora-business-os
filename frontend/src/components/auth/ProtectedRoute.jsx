import { Navigate } from "react-router";
import useAuth from "../../hooks/useAuth";

function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <p>Checking authentication...</p>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
export default ProtectedRoute;
