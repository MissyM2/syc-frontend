import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../app/store';
import { deleteClosetitemAndImageData } from '../closetitemActions';

import ownerImg from '../../../assets/ownerImg.jpg';
import { Link } from 'react-router-dom';
import type { Closetitem } from '../closetitemInterfaces.ts';
//import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FaMinus } from 'react-icons/fa6';
import { FaEdit } from 'react-icons/fa';
import RoundButtonSmall from './RoundButtonSmall.tsx';

import {
  Card,
  //CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface ClosetitemProps {
  closetitem: Closetitem;
}

export const ClosetitemCard: React.FC<ClosetitemProps> = ({
  closetitem,
}): React.JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  // const { status, error } = useSelector(
  //   (state: RootState) => state.closetitems
  // );

  const date = new Date(closetitem.dateCreated);

  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  const handleDelete = () => {
    console.log(
      'inside handleDelete. what is closetitem? ' + JSON.stringify(closetitem)
    );
    dispatch(
      deleteClosetitemAndImageData({
        itemId: closetitem._id,
        userId: closetitem.userId,
        imageId: closetitem.imageId,
      })
    );
  };

  const handleClickEdit = () => {
    alert('Delete button clicked!');
  };

  return (
    <Link to={`/closetitem-detail-page/${closetitem._id}`} className="w-full">
      <Card className="w-full max-w-sm">
        <div className="flex justify-end bg-green-200">
          <div className="ps-1 pe-1">
            <RoundButtonSmall onClick={handleDelete}>
              <FaMinus className="h-4 w-4" />
            </RoundButtonSmall>
          </div>
          <div className="ps-1 pe-1">
            <RoundButtonSmall onClick={handleClickEdit}>
              <FaEdit className="h-4 w-4" />
            </RoundButtonSmall>
          </div>
        </div>
        <div className="grid w-full place-items-center overflow-x-scroll aspect-square  bg-gray-200">
          {closetitem.imageUrl && (
            <img
              className=""
              src={closetitem.imageUrl}
              alt={closetitem.itemName}
            />
          )}
          {/* <img
            className="object-cover object-center w-full h-full"
            src={closetitem?.imageFile?.data}
            alt={closetitem.name}
          /> */}
        </div>
        <CardHeader>
          <CardTitle>{closetitem.itemName}</CardTitle>
          <CardDescription>{closetitem.desc}</CardDescription>
          {/* <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction> */}
        </CardHeader>
        <CardContent className="flex-col gap-2 bg-green-50">
          <div className="flex flex-row gap-2">
            <div className="">
              <Label>{closetitem.category}</Label>
            </div>
            <div className="">
              <Label>{closetitem.season}</Label>
            </div>
            <div className="">
              <Label>{closetitem.rating}</Label>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-row bg-red-50">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col md:flex-row items-left">
              <div className="text-xs pr-2">Added:</div>
              <div className="text-xs">
                {formattedDate} / {formattedTime}
              </div>
            </div>
            <div className="flex flex-row items-center">
              <img
                className="w-10 h-10 rounded-full mr-4"
                src={ownerImg}
                alt="Avatar of Jonathan Reinink"
              />
              <div className="text-xs  bg-blue-50">
                <p className="text-gray-900 leading-none">Jonathan Reinink</p>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
