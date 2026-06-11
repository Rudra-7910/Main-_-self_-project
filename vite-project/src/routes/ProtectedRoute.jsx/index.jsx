import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // While checking localStorage / rehydrating, show nothing (prevents flash)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Render child routes
  return <Outlet />;
};

export default ProtectedRoute;
