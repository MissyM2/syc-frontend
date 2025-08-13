//import { CheckboxGroup } from '../features/closet/components/CheckboxGroup.tsx';
import { useEffect } from 'react';
import { OutputListUsers } from '@/features/user/components/users-output-list';
import { fetchUsers } from '@/features/user/userActions';

import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/app/store.ts';

import { useNavigate } from 'react-router-dom';

import { FaPlus } from 'react-icons/fa6';
import RoundButton from '@/components/RoundButton.tsx';

// interface FilterObject {
//   searchTerm: string;
// }

const ManageUsersPage: React.FC = () => {
  const { allUsers, status, error } = useSelector(
    (state: RootState) => state.user
  );
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const userRole = useSelector(
    (state: RootState) => state.user.currentUser?.userRole
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isAuthenticated && userRole === 'admin') {
      dispatch(fetchUsers());
    }
  }, [dispatch]);

  const navigate = useNavigate();

  if (status == 'loading') {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full">
      <div>User Administration</div>

      <div>
        Users are fetched from Atlas. Number of users: {allUsers.length}
      </div>

      <div className="flex justify-end p-4"></div>

      <OutputListUsers data={allUsers} />
    </div>
  );
};

export default ManageUsersPage;
