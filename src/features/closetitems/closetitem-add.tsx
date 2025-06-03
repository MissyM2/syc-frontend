import React from 'react';
//import type { Closetitem } from '@/interfaces/Interfaces.tsx';
import { Toaster, toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import type { Option } from '@/interfaces/Interfaces.tsx';

import { Input } from '../../components/ui/input.tsx';
import { Button } from '../../components/ui/button.tsx';

import { createClosetitem } from './closetitem-api.ts';

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

const FormSchema = z.object({
  category: z.string({
    required_error: 'Please select an category to display.',
  }),
  name: z
    .string({
      required_error: 'Please add a title.',
    })
    .min(5),
  season: z.string({
    required_error: 'Please select a season.',
  }),
  size: z.string({
    required_error: 'Please select an size.',
  }),
  desc: z
    .string({
      required_error: 'Please add a description.',
    })
    .min(10),
  rating: z.string({
    required_error: 'Please add a rating.',
  }),
  dateCreated: z.date(),
  // itemImage: z
  //   .custom<File>((v) => v instanceof File, {
  //     message: 'Invalid file type.',
  //   })
  //   .optional(),
});

// If the image is optional, you can use:
// image: z.custom<File>((v) => v instanceof File, {
//   message: 'Invalid file type.',
// }).optional(),

//import { createClosetitem } from '../../api-functions.ts';

export const ClosetItemAddPage: React.FC = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dateCreated: new Date(),
    },
  });

  async function onSubmit(closetitemData: z.infer<typeof FormSchema>) {
    //let closetitemObject = {};
    //closetitemData.dateCreated = new Date();

    await createClosetitem(closetitemData);

    toast.success('Operation successful!', {
      duration: 6000, // milliseconds
      className: 'bg-green-500', // Tailwind CSS class
      description: (
        <pre className="mt-2 size-fit rounded-md bg-slate-300 p-4">
          <code className="text-white">
            {JSON.stringify(closetitemData, null, 2)}
          </code>
        </pre>
      ),
    });
  }

  return (
    <div className="grid grid-flow-row w-full justify-items-center">
      <Toaster position="bottom-center" />
      <h1 className="text-center text-xl lg:text-3xl mb-2 lg:mb-3">
        Please add your info on the closet item here.
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          // className="grid grid-flow-row justify-items-center "
          // className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
        >
          <div>
            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Please add a title of your items"
                        className="text-xl lg:text-2xl w-full lg:mb-3"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              <div>
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-full text-xl lg:text-2xl lg:mb-3">
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
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="season"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-full text-xl lg:text-2xl lg:mb-3">
                          <SelectTrigger>
                            <SelectValue placeholder="Season" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {seasonItems.map((option: Option) => (
                            <SelectItem
                              className="text-lg"
                              key={option.value}
                              value={option.value}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-full text-xl lg:text-2xl lg:mb-3">
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

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div>
              <FormField
                control={form.control}
                name="desc"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Please add a description of your item"
                        className="text-xl lg:text-2xl w-full mb-2 lg:mb-3"
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
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Please rate your item"
                        className="text-xl lg:text-2xl w-full mb-2 lg:mb-3"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid justify-content-center mx-auto">
              <Button className="text-xl lg:text-2xl" type="submit">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
