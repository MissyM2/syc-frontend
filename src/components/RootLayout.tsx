import { Outlet } from 'react-router-dom';
import MainTopbar from './MainTopBar.tsx';

const RootLayout: React.FC = () => {
  return (
    <>
      <div className="">
        <MainTopbar />
        <main className="max-w-[90%] mx-auto p-4 h-[80vh] flex justify-center">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default RootLayout;
