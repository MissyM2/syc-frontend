import { ClosetitemCard } from './ClosetitemCard.tsx';

import type { Closetitem } from '../../../interfaces/Interfaces.tsx';

// interface ImageData {
//   data: string;
// }

// interface ClosetitemDetails {
//   _id: string;
//   category: string;
//   name: string;
//   season: string;
//   size: string;
//   desc: string;
//   rating: string;
//   dateCreated: Date;
//   imageId: string;
//   imageFile: ImageData;
// }

// export interface Closetitem {
//   _id: string;
//   category: string;
//   name: string;
//   season: string;
//   size: string;
//   desc: string;
//   rating: string;
//   dateCreated: Date;
//   imageId?: string;
//   imageFile: ImageData;
// }

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
