import { useSelector } from 'react-redux';
import type { RootState } from '@/app/store';
import type { User } from '@/interfaces/userInterfaces';

import { Label } from '@/components/ui/label';
import {
  Card,
  //CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface UserProfileProps {
  user: User;
}

const ProfilePage: React.FC<UserProfileProps> = ({
  user,
}): React.JSX.Element => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-600 text-5xl font-bold">
          {currentUser?.userName.charAt(0).toUpperCase()}
        </CardTitle>
        {/* <CardDescription>{user.desc}</CardDescription> */}
        {/* <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction> */}
      </CardHeader>
      <CardContent>
        <div>
          <Label>{currentUser?.email}</Label>
        </div>
        <div className="text-gray-700 text-base">
          {currentUser?.homeAddress
            ? `${currentUser?.homeAddress.street1}, 
                      ${currentUser?.homeAddress.street1}, 
                      ${currentUser?.homeAddress.city}, 
                      ${currentUser?.homeAddress.state} ${currentUser?.homeAddress.zipCode}`
            : 'No address'}
        </div>
        <div className="text-gray-700 text-base">{currentUser?.userRole}</div>
      </CardContent>
      <CardFooter>
        <p>
          Created At:{' '}
          {currentUser?.createdAt
            ? new Date(currentUser.createdAt).toLocaleString()
            : 'N/A'}
        </p>
        <p>
          Updated At:{' '}
          {currentUser?.updatedAt
            ? new Date(currentUser.updatedAt).toLocaleString()
            : 'N/A'}
        </p>
      </CardFooter>
    </Card>
  );
};

export default ProfilePage;
