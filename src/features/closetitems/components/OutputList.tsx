import { ClosetitemCard } from './ClosetitemCard.tsx';
import type { Closetitem } from '../../../interfaces/Interfaces.tsx';

interface OutputListProps {
  data: Closetitem[];
}

export const OutputList: React.FC<OutputListProps> = ({ data }) => {
  return (
    <div className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {data.map((closetitem) => (
        <ClosetitemCard closetitem={closetitem} key={closetitem._id} />
      ))}
    </div>
  );
};
