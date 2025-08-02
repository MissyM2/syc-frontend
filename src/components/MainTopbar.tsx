import { NavMobile } from './navMobile';
import { NavDesktop } from './navDesktop';
import RoundButton from './RoundButton.tsx';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/app/store';

const MainTopbar: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: RootState) => state.user);

  const handleGoHome = () => {
    navigate('/home');
  };
  return (
    <div className="fixed top-0 left-0 right-0 bg-blue-300 border-b border-neutral-700">
      <nav className="container flex items-center justify-between py-1 lg:py-5">
        <span className="text-lg flex flex-row items-center text-white py-1 text-md">
          <div className="ps-3 pe-2">
            <RoundButton onClick={handleGoHome}>SYC</RoundButton>
          </div>
          <div>{currentUser && `Hi, ${currentUser.userName}`}</div>
        </span>
        <span></span>
        <NavMobile />
        <NavDesktop />
      </nav>
    </div>
  );
};

export default MainTopbar;
