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
      <nav className="flex flex-row justify-between items-center h-full w-full ">
        <div>
          <NavLink to="/" className="font-bold">
            Shop Your Closet
          </NavLink>
        </div>
        <ul className="flex flex-row justify-center items-center first:mt-2 md:flex-row md:w-auto md:space-x-10 md:flex`">
          {navLinks.map((link) => (
            <li key={link.name}>
              <div className="">
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
        </ul>

        <div className="">
          <ul
            className={cn(
              'flex content-center gap-4',
              isMenuOpen &&
                'bg-slate-300 shadow-sm flex-col fixed top-12 right-0 w-1/2 md:w-1/4 p-8 transform transition-transform duration-300 ease-in-out translate-x-0',
              !isMenuOpen &&
                isMobile &&
                ' bg-slate-300 shadow-sm flex-col fixed top-12 right-0 w-1/2 md:w-1/4 p-8 transform transition-transform duration-300 ease-in-out translate-x-full'
            )}
          >
            {navAdminLinks.map((link) => (
              <li key={link.name}>
                <div className="flex justify-center items-center w-full pt-2 pb-0 border-t border-white ">
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive
                        ? 'text-slate-100 font-medium'
                        : 'text-slate-100 font-medium'
                    }
                    // onClick={closeMenuOnMobile}
                  >
                    {link.name}
                  </NavLink>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <button
          aria-labelledby="Menu Toggle Button"
          className="block"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <BiMenu className="text-white w-9 h-9 flex justify-center items-center hover:text-black" />
          ) : (
            <BiMenu className="text-white w-9 h-9 flex justify-center items-center hover:text-black" />
          )}
        </button>
      </nav>
    </header>
  );
};
