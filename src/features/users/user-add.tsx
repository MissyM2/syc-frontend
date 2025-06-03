import { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import type { Option } from '@/interfaces/Interfaces.tsx';

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

export const UserAddPage: React.FC = () => {
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
    <div className="grid grid-flow-row w-full justify-items-center">
      <h1 className="text-center text-xl lg:text-3xl mb-2 lg:mb-3">
        Please add your user info here.
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={'Name'}
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
            Create Account
          </Button>
        </form>
      </Form>
    </div>
  );
};
