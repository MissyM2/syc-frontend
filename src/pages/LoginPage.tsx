import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//import { unwrapResult } from '@reduxjs/toolkit';
import { userLogin } from '../features/user/userActions';
//import { addUserAfterAuth } from '../features/user/userSlice';
import { useEffect } from 'react';
import type { RootState, AppDispatch } from '../app/store';

import Error from '../components/Error';
import Spinner from '../components/Spinner';
//import { authApi } from '@/app/services/auth/authService';

// import { FaPlus } from 'react-icons/fa6';
// import RoundButton from '../features/closet/components/RoundButton.tsx';
// import { resetAuthSlice } from '../features/user/userSlice.ts';

interface UserAddPageProps {
  //onUpdate: (newValue: boolean) => void;
}

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage: React.FC<UserAddPageProps> = () => {
  const { status, error } = useSelector((state: RootState) => state.user);

  const auth = useSelector((state: RootState) => state.user);

  const { register, handleSubmit } = useForm<LoginFormInputs>();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate('/dashboard');
    }
  }, [auth]);

  const submitForm = async (data: LoginFormInputs) => {
    await dispatch(userLogin(data));
  };

  const handleClick = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div
        className="@container max-w-md w-full p-8 bg-zinc-50 
      rounded-2xl shadow-[0_20px_50px_rgba(0,_29,_61,_0.7)] backdrop-blur-xl 
      border border-blue-800/30 relative animate-fade-in"
      >
        <h2 className="text-3xl font-extrabold text-black-500  text-center mb-2 tracking-tight">
          Shop Your Closet
        </h2>
        <h3 className="text-xl font-extrabold text-black-500  text-center mb-2 tracking-tight">
          Sign In
        </h3>
        <p className="text-black-500  text-center mb-8">
          Sign in to continue your journey
        </p>
        <form onSubmit={handleSubmit(submitForm)}>
          {error && <Error>{error}</Error>}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register('email')}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="******************"
              {...register('password')}
              required
            />
          </div>
          <button
            type="submit"
            className="relative text-sm p-2 bg-red-200 text-black-500 rounded-sm ease-in-out"
            disabled={status == 'loading'}
          >
            {status == 'loading' ? <Spinner /> : 'Login'}
          </button>
        </form>
        <p className="mt-8 text-zinc-500/80 text-center">
          Need to create an account?
          <span
            className="text-rose-300 font-bold cursor-pointer 
            hover:text-rose-400 ml-1 transition-colors"
            onClick={handleClick}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
