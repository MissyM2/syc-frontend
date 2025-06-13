import ownerImg from '../../../assets/ownerImg.jpg';
import { Link } from 'react-router-dom';
import type { User } from '../../../interfaces/Interfaces.tsx';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import {
  Card,
  CardAction,
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

  return (
    <div>
      <Link to={`/user-detail-page/${user._id}`} className="w-full">
        <Card className="w-full max-w-sm">
          {/* <div className="grid w-full place-items-center overflow-x-scroll aspect-square  bg-gray-200">
          <img
            className="object-cover object-center w-full h-full"
            src={user?.imageFile?.data}
            alt={user.name}
          />
        </div> */}
          <CardHeader>
            <CardTitle>{user.name}</CardTitle>
            {/* <CardDescription>{user.desc}</CardDescription> */}
            {/* <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction> */}
          </CardHeader>
          <CardContent className="flex-col gap-2 bg-green-50">
            <div className="flex flex-row gap-2">
              <div className="">
                <Label>{user.emailAddress}</Label>
              </div>
            </div>
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
          </CardContent>
          <CardFooter className="flex flex-row gap-6 bg-red-50">
            <Button>Delete</Button>
            <Button>Edit</Button>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
};
