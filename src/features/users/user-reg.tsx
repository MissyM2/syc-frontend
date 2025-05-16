import { useState, useEffect } from 'react';

import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../../api-functions.ts';

const UserRegistrationPage: React.FC = () => {
  const [users, setUsers] = useState<Array<User>>([]);

  interface User {
    name: string;
    emailAddress: string;
  }

  // const handlePostUser = () => {
  //   const postObject: User = {
  //     name: 'Becky Mancuso',
  //     emailAddress: 'becky@example.com',
  //   };

  //   axios.post('http://localhost:3000/syc/users', postObject);
  // };

  // useEffect(() => {
  //   async function grabData() {
  //     const response = await axios.get(
  //       'http://localhost:3000/syc/users/68263e4fea86a5e3e602f793'
  //     );
  //     if (response.status === 200) {
  //       console.log(response);
  //       setData(response.data);
  //     }
  //   }
  //   grabData();
  // }, []);

  //return <>{JSON.stringify(data)}</>;

  useEffect(() => {
    async function loadAllUsers() {
      const data = await getUsers();
      console.log(data);
      if (data) {
        setUsers(data);
      }
    }
    loadAllUsers();
  }, []);

  return (
    <div className="flex h-screen my-auto items-center">
      <div className="m-auto">
        {JSON.stringify(users)}
        {/* <button
          className="inline-block align-middle bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handlePostUser}
        >
          Post User
        </button> */}
      </div>
    </div>
  );
};
export default UserRegistrationPage;
