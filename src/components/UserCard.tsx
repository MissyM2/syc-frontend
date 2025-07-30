import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../app/store.ts';
import { deleteUser } from '../userActions.ts';
import ownerImg from '../assets/ownerImg.jpg';

import { Link } from 'react-router-dom';
import type { User } from '../interfaces/userInterfaces.ts';
import { Label } from '@/components/ui/label';
// import { FaMinus } from 'react-icons/fa6';
// import { FaEdit } from 'react-icons/fa';
// import RoundButtonSmall from './RoundButtonSmall.tsx';

import {
  Card,
  //CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface UserProps {
  user: User;
}

export const UserCard: React.FC<UserProps> = ({ user }): React.JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  // const { status, error } = useSelector(
  //   (state: RootState) => state.closetitems
  // );

  const date = new Date(user.dateCreated);

  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  // const handleDelete = () => {
  //   //console.log('inside handleDelete');
  //   dispatch(
  //     deleteClosetitem({
  //       closetitemId: closetitem._id,
  //       userId: closetitem.userId,
  //       imageId: closetitem.imageId,
  //     })
  //   );
  // };

  // const handleClickEdit = () => {
  //   alert('Delete button clicked!');
  // };

  const columns = [
    { key: 'itemName', label: 'itemName' },
    { key: 'seasons', label: 'seasons' },
    { key: 'size', label: 'size' },
    { key: 'desc', label: 'desc' },
    { key: 'rating', label: 'rating' },
    { key: 'ImageId', label: 'ImageId' },
    { key: 'ImageUrl', label: 'ImageUrl' },
  ];

  return (
    // <Link to={`/user-detail-page/${user._id}`} className="w-full">
    <Card className="w-full bg-blue-200">
      {/* <Card className="w-full max-w-sm bg-blue-200"> */}
      <div className="flex justify-end bg-green-200">
        {/* <div className="ps-1 pe-1">
            <RoundButtonSmall onClick={handleDelete}>
              <FaMinus className="h-4 w-4" />
            </RoundButtonSmall>
          </div>
          <div className="ps-1 pe-1">
            <RoundButtonSmall onClick={handleClickEdit}>
              <FaEdit className="h-4 w-4" />
            </RoundButtonSmall>
          </div> */}
      </div>

      <CardHeader>
        <CardTitle>{user.userName}</CardTitle>
        <CardDescription>{user.email}</CardDescription>
      </CardHeader>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {user.closetitems.map((row) => (
              <tr key={row._id}>
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {column.key === 'itemName' && row.itemName}
                    {column.key === 'Seasons' && row.seasons}
                    {column.key === 'Desc' && row.desc}
                    {column.key === 'Size' && row.size}
                    {column.key === 'Rating' && row.rating}
                    {column.key === 'ImageId' && row.imageId}
                    {column.key === 'ImageUrl' && row.imageUrl}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
              alt={`Avatar of ${user.userName}`}
            />
            <div className="text-xs  bg-blue-50">
              <p className="text-gray-900 leading-none">Jonathan Reinink</p>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
    // </Link>
  );
};
