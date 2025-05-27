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
        <main className="md:container md:mx-auto mt-24 bg-blue-100">
          <Outlet />
        </main>
      </div>
    </>
  );
};
