import { useSelector } from 'react-redux';
import { Navigate, NavLink, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

  if (loading) {
    return <div>Loading...</div>; // Or a more elaborate loading component
  }

  if (!isAuthenticated) {
    return;
  }

  return <Outlet />;
};

export default ProtectedRoute;
