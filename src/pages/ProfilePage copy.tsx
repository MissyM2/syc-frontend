import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';

const ProfilePage: React.FC = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  return (
    <div>
      <figure className="flex items-center justify-center w-36 h-36 text-white text-5xl bg-gradient-to-br from-[#16b8f3] to-[#6ce7b9] rounded-full mx-auto my-8">
        {userInfo?.name.charAt(0).toUpperCase()}
      </figure>
      <span className="text-center">
        Welcome <strong>{userInfo?.name}!</strong> You can view this page
        because you're logged in
      </span>
    </div>
  );
};

export default ProfilePage;
