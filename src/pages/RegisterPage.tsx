import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Error from '@/components/Error';
import Spinner from '@/components/Spinner';
import { registerUser } from '@/features/user/userActions';
import type { RootState, AppDispatch } from '@/app/store';
import type { RegistrationFormArgs } from '@/interfaces/userInterfaces';

const RegisterPage: React.FC = () => {
  const [customError, setCustomError] = useState<string>('');

  const { status, currentUser, error, success } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch<AppDispatch>();

  const { register, handleSubmit, setValue } = useForm<RegistrationFormArgs>({
    defaultValues: {
      homeAddress: {
        street1: '7 Hitching Post Court',
        street2: '',
        city: 'Rockville',
        state: 'MD',
        zipCode: '20850',
        country: 'USA',
      },
      userRole: 'user',
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    // redirect authenticated user to profile screen
    if (currentUser) navigate('/user-profile');
    // redirect user to login page if registration was successful
    if (success) navigate('/');
  }, [navigate, currentUser, success]);

  const handleClick = () => {
    navigate('/');
  };

  const submitForm = (data: RegistrationFormArgs) => {
    try {
      if (data.password !== data.confirmPassword) {
        setCustomError('Password mismatch');
        return;
      }
      // transform email string to lowercase to avoid case sensitivity issues in login
      data.email = data.email.toLowerCase();

      dispatch(registerUser(data));
    } catch (error) {
      console.log('what is error? ' + error);
    }
  };

  const handleProfileImageChange = (e: any) => {
    const profileImageFile = e.target.files[0];
    if (profileImageFile) {
      // Assuming you want to store the file name
      setValue('profileImageId', profileImageFile.name);
      // You might also want to store the file object itself for later use
      // setValue('imageFile', file);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div
        className="@container max-w-md w-full p-8 bg-zinc-50 
      rounded-2xl shadow-[0_20px_50px_rgba(0,_29,_61,_0.7)] backdrop-blur-xl 
      border border-blue-800/30 relative animate-fade-in"
      >
        <h2 className="text-3xl font-extrabold text-zinc-800 text-center mb-2 tracking-tight">
          Shop Your Closet
        </h2>
        <h3 className="text-xl font-extrabold text-zinc-800 text-center mb-2 tracking-tight">
          Sign Up
        </h3>
        <p className="text-zinc-800 text-center mb-8">
          Sign up to start your journey
        </p>
        <form onSubmit={handleSubmit(submitForm)}>
          {error && <Error>{error}</Error>}
          {customError && <Error>{customError}</Error>}
          <div className="flex flex-col justify-center">
            <label htmlFor="userName">Name</label>
            <input
              type="text"
              className="w-full py-2 px-4 mb-4 rounded border border-[#999999]"
              {...register('userName')}
              required
            />
          </div>
          <div className="flex flex-col justify-center">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="w-full py-2 px-4 mb-4 rounded border border-[#999999]"
              {...register('email')}
              required
            />
          </div>
          <div className="flex flex-col justify-center">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="w-full py-2 px-4 mb-4 rounded border border-[#999999]"
              {...register('password')}
              required
            />
          </div>
          <div className="flex flex-col justify-center">
            <label htmlFor="email">Confirm Password</label>
            <input
              type="password"
              className="w-full py-2 px-4 mb-4 rounded border border-[#999999]"
              {...register('confirmPassword')}
              required
            />
          </div>
          <div key="admin">
            <input
              type="radio"
              value="admin"
              id="admin"
              {...register('userRole')}
            />
            <label htmlFor="admin" className="ml-2">
              Admin?
            </label>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="imageFile"
            >
              Your Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              required
              id="imageFile"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register('profileImage', { required: true })}
              onChange={handleProfileImageChange}
            />
            {/* {errors.desc && <span>This field is required</span>} */}
          </div>
          <button
            type="submit"
            className="relative text-sm p-2 bg-red-200 text-black-500 rounded-sm ease-in-out"
            disabled={status == 'loading'}
          >
            {status == 'loading' ? <Spinner /> : 'Register'}
          </button>
        </form>
        <p className="mt-8 text-zinc-500/80 text-center">
          Already have an account?
          <span
            className="text-rose-300 font-bold cursor-pointer 
            hover:text-rose-400 ml-1 transition-colors"
            onClick={handleClick}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
