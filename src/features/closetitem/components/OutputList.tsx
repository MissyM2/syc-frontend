import { ClosetitemCard } from './ClosetitemCard.tsx';
//import type { Closetitem } from '../../../interfaces/Interfaces.tsx';

interface Closetitem {
  _id: string;
  category: string;
  itemName: string;
  season: string;
  size: string;
  desc: string;
  rating: string;
  imageFile: ImageData;
  imageId?: string;
}

interface OutputListProps {
  data: Closetitem[];
}

export const OutputList: React.FC<OutputListProps> = ({ data }) => {
  //console.log('FE: outputList: ' + JSON.stringify(data));
  return (
    <div className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {data.map((closetitem) => (
        <ClosetitemCard closetitem={closetitem} key={closetitem._id} />
      ))}
    </div>
  );
};
