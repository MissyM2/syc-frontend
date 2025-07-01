import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useGetUserDetailsQuery } from '../app/services/auth/authService';
import { logout, setCredentials } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { navLinks, navAdminLinks } from '../lib/navbarData';
import { cn } from '../lib/utils';
import { BiMenu } from 'react-icons/bi';
import type { RootState, AppDispatch } from '../app/store';
//import { authApi } from '../app/services/auth/authService.js';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // automatically authenticate user if token is found
  const { data, isFetching } = useGetUserDetailsQuery('userDetails', {
    pollingInterval: 900000, // 15mins
  });

  useEffect(() => {
    if (data) {
      console.log('inside useEffect, what is data? ' + JSON.stringify(data));
      dispatch(setCredentials(data));
    }
  }, [data, dispatch]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/';
  };

  return (
    <header>
      <div className="relative flex items-center h-15 w-full p-6 bg-gray-200 text-black">
        <span>
          {isFetching
            ? `Fetching your profile...`
            : userInfo !== null
            ? `Logged in as ${userInfo.userName}`
            : "You're not logged in"}
        </span>
        <ul className="hidden md:flex flex-row justify-center items-center first:mt-2 md:flex-row md:w-auto md:space-x-10 md:flex`">
          {navLinks.map((link) => (
            <li key={link.name}>
              {/* <div className=""> */}
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive ? link.cname : link.cname
                }
                // onClick={closeMenuOnMobile}
              >
                {link.name}
              </NavLink>
              {/* </div> */}
            </li>
          ))}
        </ul>

        <div className="">
          <ul
            className={cn(
              'flex content-center gap-2',
              isMenuOpen &&
                'bg-gray-200 flex-col fixed top-12 right-0 w-1/2 md:w-1/4 p-8 transform transition-transform duration-300 ease-in-out translate-x-0',
              !isMenuOpen &&
                isMobile &&
                ' bg-gray-200 flex-col fixed top-12 right-0 w-1/2 md:w-1/4 p-8 transform transition-transform duration-300 ease-in-out translate-x-full'
            )}
          >
            {navAdminLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive ? link.cname : link.cname
                  }
                  // onClick={closeMenuOnMobile}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
            <li
              className="text-rose-500 border-t border-white font-medium w-full flex justify-center p-2.5 md:border-none md:p-0 md:w-auto"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>
        <div className="ml-auto">
          <button
            aria-labelledby="Menu Toggle Button"
            className=""
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <BiMenu className="text-white w-9 h-9 flex justify-center items-center hover:text-black" />
            ) : (
              <BiMenu className="text-white w-9 h-9 flex justify-center items-center hover:text-black" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
