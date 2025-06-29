import { Outlet } from 'react-router-dom';
import Header from './Header';

const RootLayout: React.FC = () => {
  return (
    <>
      <div className="">
        <Header />
        <main className="max-w-[90%] mx-auto p-4 h-[80vh] flex justify-center">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default RootLayout;
