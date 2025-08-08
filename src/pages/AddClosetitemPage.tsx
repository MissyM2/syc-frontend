import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { closetitemFormSchema } from '@/schemas/closetitemFormSchema';
import type { closetitemFormSchemaType } from '@/schemas/closetitemFormSchema';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/app/store.ts';
import { addClosetitem } from '@/features/closet/closetActions.ts';
import type { AddClosetitemArgs } from '@/interfaces/closetInterfaces';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  closetTypes,
  categoryItems,
  seasonItems,
  sizeItems,
  colorItems,
  occasionTypes,
  ratingItems,
} from '@/features/closet/Closetitem-datas';

const AddClosetitemPage: React.FC = () => {
  const userId = useSelector((state: RootState) => state.user.currentUser?._id);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Initialize React Hook Form with Zod resolver
  const form = useForm<z.infer<typeof closetitemFormSchema>>({
    resolver: zodResolver(closetitemFormSchema),
    defaultValues: {
      userId: userId,
      closetType: 'personal',
      itemName: '',
      itemDetails: {
        category: '',
        seasons: ['spring'],
        size: '',
        color: '',
        occasion: '',
        rating: '',
      },
      additionalDesc: '',
      imageFile: undefined,
      imageId: '',
      imageUrl: '',
    },
  });

  // Define the submit handler
  const onSubmit = async (data: closetitemFormSchemaType) => {
    try {
      const response = await dispatch(addClosetitem(data));
      if (response) {
        console.log(
          'show closetitem state after adding item. ' + JSON.stringify(response)
        );
      }
    } catch (error) {
      alert('Submitting form failed!');
    }
  };

  // Define the image change handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && e.target.files) {
      // Store the file object for form submission
      form.setValue('imageFile', e.target.files);
      // Optionally store metadata for display
      form.setValue('imageId', file.name);
      // If you need a preview URL
      const imageUrl = URL.createObjectURL(file);
      form.setValue('imageUrl', imageUrl);
    }
  };

  return (
    <Form {...form}>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div>Add Your Closet item</div>

        {/* Item Name Input Field */}
        <FormField
          control={form.control}
          name="itemName"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Item Name</FormLabel>
              <FormControl>
                <Input placeholder="Item Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Item Details Section */}

        {/* category */}
        <FormField
          control={form.control}
          name="itemDetails.category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categoryItems.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Seasons */}
        <FormField
          control={form.control}
          name="itemDetails.seasons"
          render={() => (
            <FormItem>
              <div className="">
                <FormLabel className="text-base">Seasons</FormLabel>
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                {seasonItems.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="itemDetails.seasons"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-center gap-2"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* size */}
        <FormField
          control={form.control}
          name="itemDetails.size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Size</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a size" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {sizeItems.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Color */}
        <FormField
          control={form.control}
          name="itemDetails.color"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Select your color</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col md:flex-row space-y-1"
                >
                  {colorItems.map((item) => (
                    <FormItem
                      key={item.value}
                      className="flex items-center gap-3"
                    >
                      <FormControl>
                        <RadioGroupItem value={item.value} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* occasion */}
        <FormField
          control={form.control}
          name="itemDetails.occasion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Occasion</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an occasion" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {occasionTypes.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Rating */}
        <FormField
          control={form.control}
          name="itemDetails.rating"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Select your rating</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col md:flex-row space-y-1"
                >
                  {ratingItems.map((item) => (
                    <FormItem
                      key={item.value}
                      className="flex items-center gap-3"
                    >
                      <FormControl>
                        <RadioGroupItem value={item.value} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Additional Description Field */}
        <FormField
          control={form.control}
          name="additionalDesc"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Additional Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Additional Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image Input Field */}
        <FormField
          control={form.control}
          name="imageFile"
          render={({ field: { onChange, ...field } }) => (
            <FormItem className="space-y-2">
              <FormLabel>Upload Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    handleImageChange(e);
                    onChange(e.target.files); // Update React Hook Form
                  }}
                  {...field}
                  value={undefined} // File inputs should not have a controlled value
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mb-6">
          <Button
            type="submit"
            className="relative text-sm p-2 bg-red-200 text-black-500 rounded-sm ease-in-out"
            //disabled={loading}
          >
            Add Closet Item
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddClosetitemPage;
