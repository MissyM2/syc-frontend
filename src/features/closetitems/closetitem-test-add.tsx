import React from 'react';

import { useState, useRef } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { createClosetitem } from './closetitem-api.ts';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const formSchema = z.object({
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
  imageId: z
    .any()
    // .refine((files) => files?.length >= 1, 'Image is required')
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Only .jpg, .jpeg, .png and .webp files are accepted'
    )
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB`
    ),
});

type FormValues = z.infer<typeof formSchema>;

interface Props {
  onSubmit: (data: FormValues) => void;
}

export const ClosetItemAddPage: React.FC<Props> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateCreated: new Date(),
    },
  });

  async function submitHandler(data: FormValues) {
    console.log(data);
    let response = await createClosetitem(data);
    console.log('response is ' + response);
  }

  return (
    <div className="grid grid-flow-row w-full justify-items-center">
      <h1 className="text-center text-xl lg:text-3xl mb-2 lg:mb-3">
        Please add your info on the closet item here.
      </h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label htmlFor="category">Category:</label>
          <input type="text" id="title" {...register('category')} />
          {errors.category && <p>{errors.category.message}</p>}
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" {...register('name')} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="season">Season:</label>
          <input type="text" id="season" {...register('season')} />
          {errors.season && <p>{errors.season.message}</p>}
        </div>
        <div>
          <label htmlFor="size">Size:</label>
          <input type="text" id="title" {...register('size')} />
          {errors.size && <p>{errors.size.message}</p>}
        </div>
        <div>
          <label htmlFor="desc">Desc:</label>
          <input type="text" id="title" {...register('desc')} />
          {errors.desc && <p>{errors.desc.message}</p>}
        </div>
        <div>
          <label htmlFor="rating">Rating:</label>
          <input type="text" id="rating" {...register('rating')} />
          {errors.rating && <p>{errors.rating.message}</p>}
        </div>

        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            {...register('imageId')}
            accept="image/*"
          />
          {errors.imageId && (
            <p>image error should go here but doesn't work like the others</p>
          )}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
