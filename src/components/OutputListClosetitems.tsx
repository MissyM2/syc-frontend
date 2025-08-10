import { ClosetitemCard } from '../features/closet/components/closetitem-card.tsx';
import type { Closetitem } from '../interfaces/closetTypes.ts';

interface OutputListClosetitemsProps {
  data: Closetitem[];
}

export const OutputListClosetitems: React.FC<OutputListClosetitemsProps> = ({
  data,
}) => {
  // console.log('FE: outputList: ' + JSON.stringify(data));
  // for (const i of data) {
  //   console.log(i._id);
  // }
  if (data.length == 0) {
    return <h1>There are no items to show.</h1>;
  }
  return (
    <div className="grid gap-2 p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {/* <div>
        <img className="" src={data?.imageFile?.data} alt={data.closetitem.itemName} />
      </div> */}
      {data.map((closetitem) => (
        <ClosetitemCard closetitem={closetitem} key={closetitem._id} />
      ))}
    </div>
  );
};
