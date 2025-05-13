import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useGetUserDetailsQuery } from '../app/service/auth/authService';

const Header: React.FC = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // authomatically authenticate user if token is found
  const { data, isFetching } = useGetUserDetailsQuery('userDetails', {
    pollingInterval: 900000,
  }); // 15 min

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);

  return (
    <header>
      <div className="relative flex items-center h-80 w-96 p-2 bg-gray-50 text-gray-950">
        <span>
          {isFetching
            ? `Fetcching your profile...`
            : userInfo !== null
            ? `Logged in as ${userInfo.email}`
            : "You're not logged in"}
        </span>
        <div className="ml-auto">
          {userInfo ? (
            <button className="" onClick={() => dispatch(logout())}>
              Logout
            </button>
          ) : (
            <NavLink className="" to="/login">
              Login
            </NavLink>
          )}
        </div>
      </div>
      <nav className="max-w-96 ml-auto mr-auto p-4 text-center  ">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/user-profile">Profile</NavLink>
      </nav>
    </header>
  );
};

export default Header;
