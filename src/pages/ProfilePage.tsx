import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { RootState, AppDispatch } from '@/app/store';
import type { User } from '@/interfaces/userTypes';
import { updateUser } from '@/features/user/userActions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { UpdateSubmissionArgs } from '@/interfaces/userTypes';

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

const ProfilePage: React.FC<UserProfileProps> = ({}): React.JSX.Element => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: currentUser || undefined, // Populate form with existing user data
  });

  const dispatch = useDispatch<AppDispatch>();

  const handleUpdateProfilePictureClick = () => {
    alert('Update profile picture clicked!');
  };

  useEffect(() => {
    if (currentUser) {
      // Check if user data is available
      reset(currentUser);
    }
  }, [currentUser, reset]);

  const onSubmit = (data: UpdateSubmissionArgs) => {
    console.log('Form submitted with data:', JSON.stringify(data));
    dispatch(updateUser(data)); // Dispatch Redux action to update user
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            <input {...register('userName')} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label>Name</Label>
              <input {...register('email')} />
            </div>
            <div className="grid gap-2">
              <Label>Address</Label>
              <div className="flex flex-row gap-2 mb-4">
                <input {...register('homeAddress.street1')} />

                <input {...register('homeAddress.street2')} />
              </div>
              <div className="flex flex-row gap-2 mb-4">
                <input {...register('homeAddress.city')} />
                <input {...register('homeAddress.state')} />
                <input {...register('homeAddress.zipCode')} />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 bg-blue-50">
          <CardFooter>
            <button type="submit">Update User</button>
          </CardFooter>
        </CardFooter>
      </Card>
    </form>
  );
};

export default ProfilePage;
