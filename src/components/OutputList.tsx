import { ClosetitemCard } from './ClosetitemCard.tsx';

import type { Closetitem } from '../interfaces/Interfaces';

interface OutputListProps {
  data: Closetitem[];
}

export const OutputList: React.FC<OutputListProps> = ({ data }) => {
  return (
    <div className="closetitems-list">
      {data.map((closetitem) => (
        <ClosetitemCard closetitem={closetitem} key={closetitem._id} />
      ))}
    </div>
  );
};
