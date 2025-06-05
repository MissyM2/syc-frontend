import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { navbarData } from './navbarData';
import { BiMenu } from 'react-icons/bi';
import { Button } from './ui/button.tsx';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const showNav = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className=" z-10 fixed top-0 w-full bg-slate-400 items-center flex p-4">
      <div className="flex justify-between items-center w-full flex-wrap md:flex-nowrap">
        <h1 className="text-xl text-rose-300 font-bold cursor-pointer">
          Shop Your Closet
        </h1>

        <button
          className="flex justify-end md:hidden ring-1 ring-black rounded"
          onClick={showNav}
        >
          <BiMenu className="text-white w-9 h-9 flex justify-center items-center hover:text-black" />
        </button>

        <ul
          className={`${
            isMenuOpen ? 'flex' : ' hidden'
          } flex-col justify-center items-center w-full first:mt-2 md:flex-row md:w-auto md:space-x-10 md:flex`}
        >
          {navbarData.map((link, index) => {
            return (
              <li key={index} className={link.cname}>
                <Link
                  className="hover:text-slate-700"
                  to={link.href}
                  onClick={showNav}
                >
                  {link.title}
                </Link>
              </li>
            );
          })}
        </ul>
        <Button
          onClick={() => sessionStorage.removeItem('User')}
          className={`${
            isMenuOpen ? ' flex' : ' hidden'
          } text-slate-800 hover:bg-gray-300 mx-auto md:mx-0 md:flex md:mt-0 items-center justify-center font-medium bg-gray-100 px-1 p-2 rounded-lg mt-4 w-24`}
        >
          Logout
        </Button>
      </div>
    </nav>
  );
};
