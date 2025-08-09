import { ClosetitemCard } from './closetitem-card.tsx';
import type { Closetitem } from '../../../interfaces/closetInterfaces.ts';

interface ClosetitemOutputListProps {
  data: Closetitem[];
}

export const ClosetitemOutputList: React.FC<ClosetitemOutputListProps> = ({
  data,
}) => {
  if (data.length == 0) {
    return <h1>There are no items to show.</h1>;
  }
  return (
    <div className="grid p-0 gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-center">
      {/* <div>
        <img className="" src={data?.imageFile?.data} alt={data.closetitem.itemName} />
      </div> */}
      {data.map((closetitem) => (
        <ClosetitemCard closetitem={closetitem} key={closetitem._id} />
      ))}
    </div>
  );
};
