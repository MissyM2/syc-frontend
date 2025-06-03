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

export const UserLoginPage: React.FC = () => {
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
    <div className="grid grid-flow-row w-full justify-items-center">
      <h1 className="text-center text-xl lg:text-3xl mb-2 lg:mb-3">
        Please add your user info here.
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <div>
            <FormField
              control={form.control}
              name="emailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={'Email'}
                      className="text-xl lg:text-2xl w-full lg:mb-3"
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
                      className="text-xl lg:text-2xl w-full lg:mb-3"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="mb-2">
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};
