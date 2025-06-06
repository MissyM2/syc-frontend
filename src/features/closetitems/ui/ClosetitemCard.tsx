import clothingImg from '../../../assets/clothingImg.jpg';
import ownerImg from '../../../assets/ownerImg.jpg';

interface ClosetitemType {
  _id: string;
  category: string;
  name: string;
  season: string;
  size: string;
  desc: string;
  rating: string;
}

interface ClosetitemProps {
  closetitem: ClosetitemType;
}

export const ClosetitemCard: React.FC<ClosetitemProps> = ({
  closetitem,
}): React.JSX.Element => {
  return (
    <div className="flex flex-col sm: max-w-3xs p-0 m-0 border border-gray-400 rounded-lg shadow-md overflow-hidden cursor-pointer">
      <div
        className="h-48 flex-none bg-center sm:bg-contain md: bg-cover border-b border-gray-400 text-center overflow-hidden mr-0"
        style={{ backgroundImage: `url(${clothingImg})` }}
        title="Princess Di"
      />

      <div className="h-70 bg-white p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-gray-900 font-bold text-xl mb-2">
            {closetitem.name}
          </div>
          <div>{closetitem.category}</div>
          <div>Season: {closetitem.season}</div>
          <div>Size: {closetitem.size}</div>
          <div>Rating: {closetitem.rating}</div>
          <p className="text-gray-700 text-base">{closetitem.desc}</p>
        </div>
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src={ownerImg}
            alt="Avatar of Jonathan Reinink"
          />
          <div className="text-sm">
            <p className="text-gray-900 leading-none">Jonathan Reinink</p>
            <p className="text-gray-600">Aug 18</p>
          </div>
        </div>
      </div>
    </div>
  );
};
