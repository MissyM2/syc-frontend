import { useSelector } from 'react-redux';
import { useState } from 'react';
import type { RootState } from '@/app/store';
import type { User } from '@/interfaces/userInterfaces';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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
  const [isEditing, setIsEditing] = useState(false);

  const [userName, setUserName] = useState(currentUser?.userName || '');
  const [homeAddressStreet1, setHomeAddressStreet1] = useState(
    currentUser?.homeAddress.street1 || ''
  );
  const [homeAddressStreet2, setHomeAddressStreet2] = useState(
    currentUser?.homeAddress.street2 || ''
  );
  const [homeAddressCity, setHomeAddressCity] = useState(
    currentUser?.homeAddress.city || ''
  );
  const [homeAddressState, setHomeAddressState] = useState(
    currentUser?.homeAddress.state || ''
  );
  const [homeAddressZipCode, setHomeAddressZipCode] = useState(
    currentUser?.homeAddress.zipCode || ''
  );
  console.log('currentUser: ' + JSON.stringify(currentUser));

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };
  const handleHomeAddressStreet1Change = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHomeAddressStreet1(event.target.value);
  };

  const handleHomeAddressStreet2Change = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHomeAddressStreet2(event.target.value);
  };

  const handleHomeAddressCityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHomeAddressCity(event.target.value);
  };

  const handleHomeAddressStateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHomeAddressState(event.target.value);
  };

  const handleHomeAddressZipCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHomeAddressZipCode(event.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateProfilePictureClick = () => {
    alert('Update profile picture clicked!');
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // You would typically send the updated data to your backend here
    const updatedUser = {
      ...currentUser,
      userName,
      homeAddress: {
        street1: homeAddressStreet1,
        street2: homeAddressStreet2,
        city: homeAddressCity,
        state: homeAddressState,
        zipCode: homeAddressZipCode,
      },
    };
    console.log('Saving updated user:', updatedUser);
  };

  return (
    <Card className="p-4">
      <div className="flex flex-col justify-center items-center h-screenmb-4">
        {currentUser?.profileImageUrl && (
          <img
            className="object-cover object-center
            w-48 h-48 rounded-full max-w-full border-4 border-indigo-500 mb-4"
            src={currentUser.profileImageUrl}
            alt={currentUser.userName}
          />
        )}
        <Button onClick={handleUpdateProfilePictureClick} variant="link">
          Update Profile Picture
        </Button>
      </div>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900">
          <Label>User Name</Label>
          {isEditing ? (
            <Input
              value={currentUser?.userName}
              onChange={handleUserNameChange}
            />
          ) : (
            <CardTitle>{currentUser?.userName}</CardTitle>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label>Name</Label>
            <span>{currentUser?.email}</span>
          </div>
          <div className="grid gap-2">
            <Label>Address</Label>
            <div className="flex flex-row gap-2 mb-4">
              {isEditing ? (
                <Input
                  className="w-64"
                  value={currentUser?.homeAddress.street1}
                  onChange={handleHomeAddressStreet1Change}
                />
              ) : (
                <CardTitle>{currentUser?.homeAddress.street1}</CardTitle>
              )}
              <Label>Street 2</Label>
              {isEditing ? (
                <Input
                  className="w-24"
                  value={currentUser?.homeAddress.street2}
                  onChange={handleHomeAddressStreet2Change}
                />
              ) : (
                <CardTitle>{currentUser?.homeAddress.street2}</CardTitle>
              )}
            </div>
            <div className="flex flex-row gap-2 mb-4">
              {isEditing ? (
                <Input
                  className="w-48"
                  value={currentUser?.homeAddress.city}
                  onChange={handleHomeAddressCityChange}
                />
              ) : (
                <CardTitle>{currentUser?.homeAddress.city}</CardTitle>
              )}
              {isEditing ? (
                <Input
                  className="w-15"
                  value={currentUser?.homeAddress.state}
                  onChange={handleHomeAddressStateChange}
                />
              ) : (
                <CardTitle>{currentUser?.homeAddress.state}</CardTitle>
              )}
              <Label>Zipcode</Label>
              {isEditing ? (
                <Input
                  className="w-24"
                  value={currentUser?.homeAddress.zipCode}
                  onChange={handleHomeAddressZipCodeChange}
                />
              ) : (
                <CardTitle>{currentUser?.homeAddress.zipCode}</CardTitle>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 bg-blue-50">
        <CardFooter>
          {isEditing ? (
            <button onClick={handleSaveClick}>Save</button>
          ) : (
            <button onClick={handleEditClick}>Edit</button>
          )}
        </CardFooter>
      </CardFooter>
    </Card>
  );
};

export default ProfilePage;
