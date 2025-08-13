import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../app/store.ts';
import { deleteUser } from '../userActions.ts';
import ownerImg from '@/assets/ownerImg.jpg';

import { Link } from 'react-router-dom';
import type { User } from '../../../interfaces/userTypes.ts';
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

// import {
//   createColumnHelper,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from '@tanstack/react-table'

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
    { key: 'category', label: 'category' },
    { key: 'seasons', label: 'seasons' },
    { key: 'size', label: 'size' },
    { key: 'color', label: 'color' },
    { key: 'occasion', label: 'occasion' },
    { key: 'rating', label: 'rating' },
    { key: 'addDesc', label: 'Additional Desc' },
    { key: 'imageId', label: 'ImageId' },
    { key: 'imageUrl', label: 'ImageUrl' },
  ];

  const renderCellContent = (key: string, item: any) => {
    switch (key) {
      case 'itemName':
        return item.itemName;
      case 'category':
        return item.itemDetails?.category || 'N/A';
      case 'seasons':
        return item.itemDetails?.seasons?.join(', ') || 'N/A';
      case 'size':
        return item.itemDetails?.size || 'N/A';
      case 'color':
        return item.itemDetails?.color || 'N/A';
      case 'occasion':
        return item.itemDetails?.occasion || 'N/A';
      case 'rating':
        return item.itemDetails?.rating || 'N/A';
      case 'addDesc':
        return item.additionalDesc || 'N/A';
      case 'imageId':
        return item.imageId;
      case 'imageUrl':
        return item.imageUrl;
      default:
        return 'N/A';
    }
  };

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

      <CardHeader>
        <CardTitle>{user.userName}</CardTitle>
        <div className="flex flex-row items-center gap-2">
          <CardDescription>{user.email}</CardDescription>
          <CardDescription>{user.homeAddress.street1}</CardDescription>
          <CardDescription>
            {user.homeAddress.city}, {user.homeAddress.state}{' '}
            {user.homeAddress.zipCode}{' '}
          </CardDescription>
        </div>
      </CardHeader>

      <div className="overflow-x-auto">
        {user.closetitems && user.closetitems.length > 0 ? (
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
              {user.closetitems.map((item) => (
                <tr key={item._id}>
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {renderCellContent(column.key, item)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-4 text-gray-500">No closet items available.</div>
        )}
      </div>
    </Card>
    // </Link>
  );
};
