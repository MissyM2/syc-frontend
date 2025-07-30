import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import type { RootState } from '../app/store';

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  if (
    !currentUser ||
    !currentUser.role ||
    !allowedRoles.includes(currentUser.role)
  ) {
    return <Navigate to="/login" replace />; // or a "not authorized" page
  }

  return <Outlet />;
};

export default ProtectedRoute;
