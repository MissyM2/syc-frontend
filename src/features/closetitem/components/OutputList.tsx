import { ClosetitemCard } from './ClosetitemCard.tsx';
import type { Closetitem } from '../closetitemInterfaces.tsx';

interface OutputListProps {
  data: Closetitem[];
}

export const OutputList: React.FC<OutputListProps> = ({ data }) => {
  //console.log('FE: outputList: ' + JSON.stringify(data));
  if (data.length == 0) {
    return <h1>There are no items to show.</h1>;
  }
  return (
    <div className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {data.map((closetitem) => (
        <ClosetitemCard closetitem={closetitem} key={closetitem._id} />
      ))}
    </div>
  );
};
