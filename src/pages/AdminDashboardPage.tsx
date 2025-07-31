//import { CheckboxGroup } from '../features/closet/components/CheckboxGroup.tsx';
import { useEffect } from 'react';
import { OutputListUsers } from '../components/OutputListUsers.tsx';
import { fetchUsers } from '@/features/user/userActions';

import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store.ts';

import { useNavigate } from 'react-router-dom';

import { FaPlus } from 'react-icons/fa6';
import RoundButton from '../features/closet/components/RoundButton.tsx';

// interface FilterObject {
//   searchTerm: string;
// }

const AdminDashboardPage: React.FC = () => {
  const { allUsers, status, error } = useSelector(
    (state: RootState) => state.user
  );
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  if (status == 'loading') {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleClick = () => {
    dispatch(fetchUsers());
  };

  return (
    <div className="w-full">
      <div>User Administration</div>
      <div>missy{currentUser?.email}</div>
      <div>missy{status}</div>
      <div>missy{currentUser?.role}</div>
      <div>
        <RoundButton onClick={handleClick}>
          <div>Users</div>
        </RoundButton>
      </div>
      <div>
        Users are fetched from Atlas. Number of users: {allUsers.length}
      </div>

      <div className="flex justify-end p-4"></div>
      {/* <ul>
        {allUsers.map((user) => (
          <li key={user._id}>
            {user.userName} - {user.email}
          </li>
        ))}
      </ul> */}

      <OutputListUsers data={allUsers} />
    </div>
  );
};

export default AdminDashboardPage;
