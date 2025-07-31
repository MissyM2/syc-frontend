import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import type { RootState } from '../app/store';

interface ProtectedRoutesProps {
  allowedRoles: string[];
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ allowedRoles }) => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  if (
    !currentUser ||
    !currentUser.userRole ||
    !allowedRoles.includes(currentUser.userRole)
  ) {
    return <Navigate to="/unauthorized" replace />; // or a "not authorized" page
  }

  return <Outlet />;
};

export default ProtectedRoutes;
