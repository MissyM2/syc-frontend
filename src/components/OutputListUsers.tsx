import { UserCard } from './UserCard.tsx';
import type { User } from '../interfaces/userInterfaces.ts';

interface OutputListUsersProps {
  data: User[];
}

export const OutputListUsers: React.FC<OutputListUsersProps> = ({ data }) => {
  // for (const i of data) {
  //   console.log(i._id);
  // }
  if (data.length == 0) {
    return <h1>There are no items to show.</h1>;
  }
  return (
    <div className="grid gap-2 p-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 bg-red-200">
      {data.map((user) => (
        <UserCard user={user} key={user._id} />
      ))}
    </div>
  );
};
