import React from 'react';
//import type { Closetitem } from '@/interfaces/Interfaces.tsx';
import { Toaster, toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import type { Option } from '@/interfaces/Interfaces.tsx';
import {
  categoryItems,
  seasonItems,
  sizeItems,
} from '../../components/Datas.ts';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '../../components/ui/input.tsx';
import { Button } from '../../components/ui/button.tsx';

// const FormSchema = z.object({
//   category: z.string().min(1),
//   name: z.string().min(1),
//   season: z.string().min(1),
//   size: z.string().min(1),
//   desc: z.string().min(1),
//   rating: z.string().min(1),
// });

const FormSchema = z.object({
  category: z.string({
    required_error: 'Please select an category to display.',
  }),
  name: z
    .string({
      required_error: 'Please select an category to display.',
    })
    .min(5),
  season: z.string({
    required_error: 'Please select an season to display.',
  }),
  size: z.string({
    required_error: 'Please select an season to display.',
  }),
});

//import { createClosetitem } from '../../api-functions.ts';

export const ClosetItemAddPage: React.FC = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.success('Operation successful!', {
      duration: 6000, // milliseconds
      className: 'bg-green-500', // Tailwind CSS class
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <>
      <Toaster position="bottom-center" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6 bg-red-300"
        >
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categoryItems.map((option: Option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Please add a title of your items"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="season"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Season" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {seasonItems.map((option: Option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Size" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sizeItems.map((option: Option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  You can manage size addresses in your{' '}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};
