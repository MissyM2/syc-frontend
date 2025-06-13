import { UserCard } from './UserCard.tsx';
import type { User } from '../../../interfaces/Interfaces.tsx';

interface OutputListProps {
  data: User[];
}

export const OutputList: React.FC<OutputListProps> = ({ data }) => {
  return (
    <div>
      <h2>App Users</h2>
      <div className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {data.map((user) => (
          <UserCard user={user} key={user._id} />
        ))}
      </div>
    </div>
  );
};
