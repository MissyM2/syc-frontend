import { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import type { Option } from '@/interfaces/Interfaces.tsx';
import { useNavigate } from 'react-router-dom';

import { Input } from '../../components/ui/input.tsx';
import { Button } from '../../components/ui/button.tsx';

import { createUser } from './user-api.ts';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

const FormSchema = z.object({
  name: z
    .string({
      required_error: 'Please add a title.',
    })
    .max(20, 'name must be less than 20 characters'),
  emailAddress: z
    .string()
    .email()
    .max(40, 'name must be less than 40 characters'),
  password: z.string().min(5, 'Password must be at least 8 characters'),
  dateCreated: z.date(),
});

interface UserAddPageProps {
  onUpdate: (newValue: boolean) => void;
}

export const UserAddPage: React.FC<UserAddPageProps> = ({ onUpdate }) => {
  const handleClick = () => {
    onUpdate(false);
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dateCreated: new Date(),
    },
  });

  async function onSubmit(userData: z.infer<typeof FormSchema>) {
    let response = await createUser(userData);

    console.log(response);
    if (response.status !== 201) {
      alert('User account counld not be created :(');
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
          Sign Up
        </h2>
        <p className="text-zinc-800 text-center mb-8">
          Sign up to start your journey
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-5 perspective-1000"
          >
            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={'Name'}
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
              Create Account
            </Button>
          </form>
        </Form>
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
