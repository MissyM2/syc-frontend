import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { userLogin } from '../features/auth/authActions';
import { addUserAfterAuth } from '../features/user/userSlice';
import { useEffect } from 'react';
import type { RootState, AppDispatch } from '../app/store';

import Error from '../components/Error';
import Spinner from '../components/Spinner';
import { authApi } from '@/app/services/auth/authService';

interface UserAddPageProps {
  //onUpdate: (newValue: boolean) => void;
}

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage: React.FC<UserAddPageProps> = () => {
  const { loading, userInfo, error } = useSelector(
    (state: RootState) => state.auth
  );

  const authSt = useSelector((state: RootState) => state.auth);

  const userSt = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const { register, handleSubmit } = useForm<LoginFormInputs>();

  const navigate = useNavigate();

  // redirect authenticated user to profile screen
  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard');
    }
  }, [navigate, userInfo]);

  const submitForm = async (data: LoginFormInputs) => {
    //console.log('auth: what are users BEFORE login? ' + JSON.stringify(authSt));

    const resultAction = await dispatch(userLogin(data));
    // console.log(
    //   'after fulfillment.  waht is state after update? ' +
    //     JSON.stringify(authSt.userInfo)
    // );
    // console.log('auth: what are users AFTER login? ' + JSON.stringify(authSt));
    // console.log('users: what are users before login? ' + JSON.stringify(users));

    const { loggedInUserInfo } = unwrapResult(resultAction);
    //console.log('what is userInfo? ' + JSON.stringify(userInfo));

    // console.log(
    //   'Before User update: submit Form userSt' + JSON.stringify(userSt)
    // );

    dispatch(addUserAfterAuth(loggedInUserInfo));

    // console.log(
    //   'AFTER User update: submit Form userSt' + JSON.stringify(userSt)
    // );
  };

  const handleClick = () => {
    //onUpdate(true);
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
            disabled={loading}
          >
            {loading ? <Spinner /> : 'Login'}
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
