import { useClickAway } from 'react-use';
import { useRef } from 'react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Squash as Hamburger } from 'hamburger-react';
import { navRoutes } from '../routes/navRoutes';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';
import { Link } from 'react-router-dom';
import { logout } from '../features/user/userSlice';

export const NavMobile = () => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);
  const userRole = useSelector(
    (state: RootState) => state.user.currentUser?.userRole
  );
  const dispatch = useDispatch<AppDispatch>();

  useClickAway(ref, () => setOpen(false));

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/';
  };

  return (
    <div ref={ref} className="md:hidden ">
      <Hamburger toggled={isOpen} size={20} toggle={setOpen} />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed left-0 shadow-4xl right-0 top-[3.5rem] p-5 pt-0 bg-blue-200 border-b border-b-white/20"
          >
            <ul className="grid gap-2">
              {userRole &&
                navRoutes.map((route, idx) => {
                  const { title, path, requiredRoles, Icon, onClickFunction } =
                    route;
                  const linkProps: React.ComponentProps<typeof Link> = {
                    to: path,
                    className:
                      'flex items-center justify-between w-full p-5 rounded-xl bg-blue-450',
                  };
                  if (typeof onClickFunction === 'function') {
                    linkProps.onClick = onClickFunction;
                  }

                  return (
                    requiredRoles.includes(userRole) && (
                      <Link
                        key={title}
                        {...linkProps}
                        onClick={() => setOpen((prev) => !prev)}
                      >
                        <span className="flex gap-1 text-lg">{title}</span>
                        <Icon className="text-xl" />
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
