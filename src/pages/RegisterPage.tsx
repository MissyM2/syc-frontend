import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Error from '../components/Error';
import Spinner from '../components/Spinner';
import { registerUser } from '../features/user/userActions';
import type { RootState, AppDispatch } from '../app/store';

interface RegistrationPageProps {
  //onUpdate: (newValue: boolean) => void;
}

interface RegistrationFormInputs {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage: React.FC<RegistrationPageProps> = () => {
  const [customError, setCustomError] = useState<string>('');

  const { status, userInfo, error, success } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch<AppDispatch>();

  const { register, handleSubmit } = useForm<RegistrationFormInputs>();
  const navigate = useNavigate();

  useEffect(() => {
    // redirect authenticated user to profile screen
    if (userInfo) navigate('/user-profile');
    // redirect user to login page if registration was successful
    if (success) navigate('/');
  }, [navigate, userInfo, success]);

  const handleClick = () => {
    //onUpdate(false);
    navigate('/');
  };

  const submitForm = (data: RegistrationFormInputs) => {
    // check if passwords match
    if (data.password !== data.confirmPassword) {
      setCustomError('Password mismatch');
      return;
    }
    // transform email string to lowercase to avoid case sensitivity issues in login
    data.email = data.email.toLowerCase();

    dispatch(registerUser(data));
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
