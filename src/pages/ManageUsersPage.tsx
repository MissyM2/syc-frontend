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
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  if (status == 'loading') {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleClick = () => {
    const res = dispatch(fetchUsers());
    console.log('Fetch Users Response:', JSON.stringify(res));
  };

  return (
    <div className="w-full">
      <div>User Administration</div>
      <div>Current User: {currentUser?.email}</div>
      <div>Status: {status}</div>
      <div>User Role: {currentUser?.userRole}</div>
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

export default ManageUsersPage;
