import { Outlet } from 'react-router-dom';
import MainTopbar from '@/components/MainTopbar.tsx';

const RootLayout: React.FC = () => {
  return (
    <>
      <header>
        <MainTopbar />
      </header>
      <main className="max-w-[90%] mx-auto mt-12 lg:mt-15 pt-12 lg:pt-16 p-4 h-[80vh] flex justify-center">
        <Outlet />
      </main>
      {/* <footer>this is footer content</footer> */}
    </>
  );
};

export default RootLayout;
