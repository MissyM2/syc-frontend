import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
// import { fetchUsers } from './authSlice';
// import type { User } from './authSlice';
import './user.css';

function UserPage() {
  //const [users, setUsers] = useState<Array<User>>([]);
  // const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | undefined>(undefined);
  // const selectedUsers = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   setLoading(selectedUsers.loading);
  //   setError(selectedUsers.error);
  //   setUsers(selectedUsers.users);
  //   return () => {
  //     console.log('component unmounting...');
  //   };
  // }, [selectedUsers]);

  function handleFetchUser() {
    const res = dispatch(fetchUsers());
    console.log('users are ' + JSON.stringify(res));
  }

  return (
  //   <div
  //     className="min-h-screen flex items-center justify-center bg-linear-135
  //    from-blue-950 via-blue-900 to-blue-800 p-8"
  //   >
  //     <div
  //       className="@container max-w-md w-full p-8 bg-blue-950/30 
  //     rounded-2xl shadow-[0_20px_50px_rgba(0,_29,_61,_0.7)] backdrop-blur-xl 
  //     border border-blue-800/30 relative animate-fade-in"
  //     >
  //       <div
  //         className="absolute inset-0 bg-gradient-t-br 
  //       from-blue-800/20 to-transparent rounded-2xl"
  //       ></div>
  //       <div className="relative">
  //         <h2 className="text-3xl font-extrabold text-yellow-300 text-center mb-2 tracking-tight">
  //           List of Names
  //         </h2>
  //         <p className="text-blue-200 text-center mb-8">
  //           Pulled from external library
  //         </p>
  //         {loading && <div>Loading...</div>}
  //         {error && <div>Error: {error}</div>}
  //         {users?.map((user) => (
  //           <li
  //             className="w-full p-4
  //             bg-blue-900/30 rounded-xl border border-blue-700/50 text-white 
  //             placeholder-blue-300/50 outline-none focus:ring-2 
  //             focus:ring-yellow-400/50 focus:border-transparent transition-all"
  //             key={user.id}
  //           >
  //             {user.id} | {user.name} | {user.email}
  //           </li>
  //         ))}

  //         <button
  //           className="group[ w-full p-4 mt-6 bg-gradient-to-r 
  //           from-yellow-500 to-yellow-400 text-blue rounded-xl font-bold 
  //           shadow-lg hover:shadow-yellow-400/40 overflow-hidden transform transform-style-3d 
  //           hover:-translate-y-0.5 hover:scale-105 hover:translate-z-20 
  //           transition-all duration-300 relative"
  //           onClick={handleFetchUser}
  //         >
  //           Fetch
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );
}
export default UserPage;
