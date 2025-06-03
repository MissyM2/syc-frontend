import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import axios from 'axios';

import { Input } from '../../components/ui/input.tsx';
import { Button } from '../../components/ui/button.tsx';

import { verifyUser } from './user-api.ts';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

const FormSchema = z.object({
  emailAddress: z
    .string()
    .email()
    .max(40, 'name must be less than 40 characters'),
  password: z.string().min(5, 'Password must be at least 8 characters'),
  dateLogin: z.date(),
});

interface UserAddPageProps {
  onUpdate: (newValue: boolean) => void;
}

export const UserLoginPage: React.FC<UserAddPageProps> = ({ onUpdate }) => {
  const handleClick = () => {
    onUpdate(true);
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dateLogin: new Date(),
    },
  });

  const navigate = useNavigate();

  async function onSubmit(userData: z.infer<typeof FormSchema>) {
    let response = await verifyUser(userData);
    if (response) {
      sessionStorage.setItem('User', response);
      axios.defaults.headers.common['authorization'] = `Bearer ${response}`;
      navigate('/home');
    } else {
      alert('Login Failed');
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center 
     bg-blue-50 p-8"
    >
      <div
        className="@container max-w-md w-full p-8 bg-zinc-50 
      rounded-2xl shadow-[0_20px_50px_rgba(0,_29,_61,_0.7)] backdrop-blur-xl 
      border border-blue-800/30 relative animate-fade-in"
      >
        <h2 className="text-3xl font-extrabold text-zinc-800 text-center mb-2 tracking-tight">
          Shop Your Closet
        </h2>
        <h3 className="text-xl font-extrabold text-zinc-800 text-center mb-2 tracking-tight">
          Sign In
        </h3>
        <p className="text-zinc-800 text-center mb-8">
          Sign in to continue your journey
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-5 perspective-1000"
          >
            <div>
              <FormField
                control={form.control}
                name="emailAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={'Email'}
                        className="w-full p-4 bg-blue-100/30 rounded-xl border border-blue-500/50 text-rose-400 
                                placeholder-blue-300/50 outline-none focus:ring-2 
                                focus:ring-rose-400/50 focus:border-transparent transition-all"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        className="w-full p-4 bg-blue-100/30 rounded-xl border border-blue-500/50 text-rose-400 
                                placeholder-blue-300/50 outline-none focus:ring-2 
                                focus:ring-rose-400/50 focus:border-transparent transition-all"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="group[ w-full p-4 mt-6 bg-gradient-to-r 
            from-rose-400 to-rose-300 text-zinc-800 rounded-xl font-bold 
            shadow-lg hover:shadow-rose-400/40 overflow-hidden transform transform-style-3d 
            hover:-translate-y-0.5 hover:scale-105 hover:translate-z-20 
            transition-all duration-300 relative"
            >
              Login
            </Button>
          </form>
        </Form>
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
