import { Navbar } from './Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const RootLayout = () => {
  // let user = sessionStorage.getItem("User")
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user) {
  //     navigate('/');
  //   }
  // }, [user]);

  return (
    <>
      <div className="min-h-screen flex justify-center">
        <Navbar />
        <main className="flex first-letter:w-screen justify-center mt-24">
          <Outlet />
        </main>
      </div>
    </>
  );
};
