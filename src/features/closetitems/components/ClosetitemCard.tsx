import ownerImg from '../../../assets/ownerImg.jpg';
import { Link } from 'react-router-dom';
import type { Closetitem } from '../../../interfaces/Interfaces.tsx';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ClosetitemProps {
  closetitem: Closetitem;
}

export const ClosetitemCard: React.FC<ClosetitemProps> = ({
  closetitem,
}): React.JSX.Element => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div>
          <img src={closetitem?.imageFile?.data} className="max-h-96 my-4" />
        </div>
        <CardTitle>{closetitem.name}</CardTitle>
        <CardDescription>{closetitem.desc}</CardDescription>
        {/* <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction> */}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label>Category: {closetitem.category}</Label>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label>Season: {closetitem.season}</Label>
            </div>
            <div className="flex items-center">
              <Label>Rating: {closetitem.rating}</Label>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        {/* <div className="flex items-center">
          <Label>Added on: {cldate}</Label>
        </div> */}
        <img
          className="w-10 h-10 rounded-full mr-4"
          src={ownerImg}
          alt="Avatar of Jonathan Reinink"
        />
        <div className="text-sm">
          <p className="text-gray-900 leading-none">Jonathan Reinink</p>
          <p className="text-gray-600">Aug 18</p>
        </div>
      </CardFooter>
    </Card>
    // <div className="flex flex-col sm: max-w-3xs p-0 m-0 border border-gray-400 rounded-lg shadow-md overflow-hidden cursor-pointer">
    //   <Link to={`/closetitem-detail-page/${closetitem._id}`} className="w-full">
    //     <div className="h-70 bg-white p-4 flex flex-col justify-between leading-normal">
    //       <div className="mb-8">
    //         <div className="text-gray-900 font-bold text-xl mb-2">
    //           {closetitem.name}
    //         </div>
    //         <div>{closetitem.category}</div>
    //         <div>Season: {closetitem.season}</div>
    //         <div>Size: {closetitem.size}</div>
    //         <div>Rating: {closetitem.rating}</div>
    //         <p className="text-gray-700 text-base">{closetitem.desc}</p>
    //       </div>
    //       <div className="flex items-center">
    //         <img
    //           className="w-10 h-10 rounded-full mr-4"
    //           src={ownerImg}
    //           alt="Avatar of Jonathan Reinink"
    //         />
    //         <div className="text-sm">
    //           <p className="text-gray-900 leading-none">Jonathan Reinink</p>
    //           <p className="text-gray-600">Aug 18</p>
    //         </div>
    //       </div>
    //     </div>
    //     {/* </div> */}
    //   </Link>
    // </div>
  );
};
