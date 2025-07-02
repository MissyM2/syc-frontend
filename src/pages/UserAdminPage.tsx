import { useState, useEffect, useCallback } from 'react';
//import axios from 'axios';
import type { User } from '../interfaces/Interfaces.tsx';

import { OutputList } from '../features/user/components/OutputList.tsx';
//import { getAllUsers } from '../features/users/user-api.ts';
import { fetchUsers } from '../features/user/userSlice.ts';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../app/store';

//const URL = 'http://localhost:3000';

export type TUserList = User[];

export const UserAdminPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const loadAllUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const resultAction = await dispatch(fetchUsers());
        if ('payload' in resultAction && Array.isArray(resultAction.payload)) {
          setUsers(resultAction.payload);
        } else {
          setUsers([]);
        }
      } catch (e: any) {
        setError(e.message);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    loadAllUsers();
  }, []);

  return (
    <div className="w-full">
      <OutputList data={users} />
    </div>
  );
};
