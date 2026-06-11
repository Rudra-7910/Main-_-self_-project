import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }
  if (!isAuthenticated?.accessToken) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
