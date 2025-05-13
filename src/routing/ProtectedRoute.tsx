import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  // show unauthroized screen if no user is found in redux store
  if (!userInfo) {
    return (
      <div className="text-center">
        <h1 className="m-2">Unauthorized :(</h1>
        <span className="inline-block">
          <NavLink to="/login">Login</NavLink> to gain access
        </span>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
