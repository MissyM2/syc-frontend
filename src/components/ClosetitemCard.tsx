import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store.ts';
import { deleteClosetitem } from '../features/closet/closetActions.ts';

import ownerImg from '../assets/ownerImg.jpg';
import { Link } from 'react-router-dom';
import type { Closetitem } from '../interfaces/closetInterfaces.ts';
//import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FaMinus } from 'react-icons/fa6';
import { FaEdit } from 'react-icons/fa';
import RoundButtonSmall from '../features/closet/components/RoundButtonSmall.tsx';

import {
  Card,
  //CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { current } from '@reduxjs/toolkit';

interface ClosetitemProps {
  closetitem: Closetitem;
}

export const ClosetitemCard: React.FC<ClosetitemProps> = ({
  closetitem,
}): React.JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector((state: RootState) => state.user);

  const handleDelete = () => {
    //console.log('inside handleDelete');
    dispatch(
      deleteClosetitem({
        closetitemId: closetitem._id,
        userId: closetitem.userId,
        imageId: closetitem.imageId,
      })
    );
  };

  const handleClickEdit = () => {
    alert('Delete button clicked!');
  };

  return (
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
      <CardContent className="flex-col gap-2">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <Label
              className="text-gray-700 text-xs"
              htmlFor="{closetitem.closetType}"
            >
              Item is located in this closet:
            </Label>
            <span className="text-xs md:text-sm text-muted-foreground">
              {closetitem.closetType}
            </span>
          </div>
        </div>
      </CardContent>

      <div className="grid w-full place-items-center overflow-x-scroll aspect-square bg-gray-200">
        {closetitem.imageUrl && (
          <img
            className=""
            src={closetitem.imageUrl}
            alt={closetitem.itemName}
          />
        )}
      </div>
      <CardHeader>
        <CardTitle>{closetitem.itemName}</CardTitle>
      </CardHeader>
      <CardContent className="flex-col gap-2">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <Label
              className="text-gray-700 text-xs"
              htmlFor="{closetitem.itemDetails.category}"
            >
              Category
            </Label>
            <span className="text-xs md:text-sm text-muted-foreground">
              {closetitem.itemDetails.category}
            </span>
          </div>
          <div className="flex justify-between">
            <Label htmlFor="{closetitem.itemDetails.seasons.join(', ')}">
              Seasons
            </Label>
            <span className="text-xs md:text-sm text-muted-foreground">
              {closetitem.itemDetails.seasons.join(', ')}
            </span>
          </div>
          <div className="flex justify-between">
            <Label htmlFor="{closetitem.itemDetails.size}">Size</Label>
            <span className="text-xs md:text-sm text-muted-foreground">
              {closetitem.itemDetails.size}
            </span>
          </div>
          <div className="flex justify-between">
            <Label htmlFor="{closetitem.itemDetails.color}">Color</Label>
            <span className="text-xs md:text-sm text-muted-foreground">
              {closetitem.itemDetails.color}
            </span>
          </div>
          <div className="flex justify-between">
            <Label htmlFor="{closetitem.itemDetails.occasion}">Occasion</Label>
            <span className="text-xs md:text-sm text-muted-foreground">
              {closetitem.itemDetails.occasion}
            </span>
          </div>
          <div className="flex justify-between">
            <Label htmlFor="{closetitem.itemDetails.rating}">Rating</Label>
            <span className="text-xs md:text-sm text-muted-foreground">
              {closetitem.itemDetails.rating}
            </span>
          </div>
        </div>
        <Label htmlFor="{closetitem.additionalDesc}">
          Additional Description
        </Label>
        <CardDescription>{closetitem.additionalDesc}</CardDescription>
      </CardContent>
      <CardFooter className="flex-row bg-red-50">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col md:flex-row items-left">
            <div className="text-xs">
              <p>
                Created At: {new Date(closetitem.createdAt).toLocaleString()}
              </p>
              <p>
                Updated At: {new Date(closetitem.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center">
            <img
              className="w-10 h-10 rounded-full mr-4"
              src={currentUser?.profileImageUrl}
              alt={`Avatar of ${currentUser?.userName}`}
            />
            <div className="text-xs  bg-blue-50">
              <p className="text-gray-900 leading-none">
                {currentUser?.userName}
              </p>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
