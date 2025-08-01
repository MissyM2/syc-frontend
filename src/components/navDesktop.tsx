import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';
import { navRoutes } from '../routes/navRoutes';
import { Link } from 'react-router-dom';
import { logout } from '../features/user/userSlice';

export const NavDesktop = () => {
  const userRole = useSelector(
    (state: RootState) => state.user.currentUser?.userRole
  );

  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/';
  };

  return (
    <ul className="hidden md:flex md:items-center gap-5 text-sm">
      {userRole &&
        navRoutes.map((route) => {
          const { title, path, requiredRoles, onClickFunction, Icon } = route;
          // Only pass onClick if it's a function
          const linkProps: React.ComponentProps<typeof Link> = {
            to: path,
            className:
              'flex items-center text-white gap-1 hover:text-neutral-400 transition-all',
          };
          if (typeof onClickFunction === 'function') {
            linkProps.onClick = onClickFunction;
          }
          return (
            requiredRoles.includes(userRole) && (
              <Link key={title} {...linkProps}>
                <Icon />
                {title}
              </Link>
            )
          );
        })}
      <li
        className="text-rose-500 border-t border-white font-medium w-full flex justify-center p-2.5 md:border-none md:p-0 md:w-auto"
        onClick={handleLogout}
      >
        Logout
      </li>
    </ul>
  );
};
