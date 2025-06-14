import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { navLinks, navAdminLinks } from './navbarData';
import { BiMenu } from 'react-icons/bi';
import { Button } from './ui/button.tsx';

import { useViewportSize } from '@mantine/hooks';
import { cn } from '../lib/utils';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //const { width } = useViewportSize();

  //const isMobile = width < 768; // below md breakpoint
  const isMobile = true;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // const closeMenuOnMobile = () => {
  //   if (isMobile) {
  //     setIsMenuOpen(false);
  //   }
  // };

  return (
    <header className="fixed w-full px-8  bg-slate-400 shadow-sm shadow-neutral-500 h-12 flex items-center">
      <nav className="flex justify-between items-center w-full ">
        <NavLink to="/" className="font-bold">
          NavigationBar
        </NavLink>
        <div>
          <ul
            className={cn(
              'flex content-center gap-8',
              isMenuOpen &&
                'bg-slate-300 shadow-sm flex-col fixed top-12 right-0 w-1/2 md:w-1/4 p-8 transform transition-transform duration-300 ease-in-out translate-x-0',
              !isMenuOpen &&
                isMobile &&
                ' bg-slate-300 shadow-sm flex-col fixed top-10 right-0 w-1/2 md:w-1/4 p-8 transform transition-transform duration-300 ease-in-out translate-x-full'
            )}
          >
            {navAdminLinks.map((link) => (
              <li key={link.name}>
                <div className="flex justify-center items-center w-75 bg-red-100 border-t border-white">
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive
                        ? 'text-slate-100 font-medium '
                        : 'text-slate-100 font-medium '
                    }
                    // onClick={closeMenuOnMobile}
                  >
                    {link.name}
                  </NavLink>
                </div>
              </li>
            ))}
            {/* <a
              href="https://chinwike.space"
              className="rounded-lg py-2 px-4 bg-[#1FABEB]"
            >
              Explore Further
            </a> */}
          </ul>
        </div>

        <button
          aria-labelledby="Menu Toggle Button"
          className="block"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <BiMenu className="text-white bg-red w-9 h-9 flex justify-center items-center hover:text-black" />
          ) : (
            <BiMenu className="text-white bg-red w-9 h-9 flex justify-center items-center hover:text-black" />
          )}
        </button>
      </nav>
    </header>
  );
};
