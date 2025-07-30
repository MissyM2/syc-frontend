import { useSelector } from 'react-redux';
import { Navigate, NavLink, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const status = useSelector((state) => state.user.status);

  if (status == 'loading') {
    return <div>Loading...</div>; // Or a more elaborate loading component
  }

  if (!isAuthenticated) {
    return;
  }

  return <Outlet />;
};

export default ProtectedRoute;
