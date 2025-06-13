import React from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
//import { Button, Form } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';
import { seasonItems, sizeItems, categoryItems } from './Closetitem-datas.ts';

import { createClosetitem } from './closetitem-api.ts';

interface Option {
  value: string;
  label: string;
}

interface FormData {
  category: string;
  name: string;
  seasons: string[];
  size: string;
  desc: string;
  rating: string;
  dateCreated: Date;
  imageId: string;
  imageFile: FileList;
}

export const CreateClosetitemPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      category: '',
      name: '',
      seasons: [],
      size: '',
      desc: '',
      rating: '',
      imageId: '',
    },
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log('data: ' + JSON.stringify(data));
    if (data.imageFile && data.imageFile.length > 0) {
      const file = data.imageFile[0];
      console.log('Selected image:', file);
      const modifiedData = {
        ...data,
        dateCreated: new Date(),
        imageId: data.imageFile[0].name,
        imageFile: file,
      };

      console.log('modified data: ' + JSON.stringify(modifiedData));

      try {
        const response = await createClosetitem(modifiedData);
        const { errors = {} } = response?.data;
        if (response) {
          navigate('/home');
        }
      } catch (error) {
        alert('Submitting form failed!');
      }
    } else {
      return;
    }
  };

  const watchSeasonOptions = watch('seasons');
  const watchSizeOption = watch('size');
  const watchCategoryOption = watch('category');
  const watchNameOption = watch('name');
  const watchDescOption = watch('desc');
  const watchRatingOption = watch('desc');

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-3 gap-x-8 gap-y-4">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              {...register('name', { required: true })}
            />
            {errors.name && <span>This field is required</span>}
          </div>

          <h3>Category</h3>

          <div className="grid grid-cols-5 gap-x-4 gap-y-2">
            {categoryItems.map((option) => (
              <div key={option.value}>
                <input
                  type="radio"
                  value={option.value}
                  id={option.value}
                  {...register('category')}
                />
                <label htmlFor={option.value} className="ml-2">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
          <h3>Season</h3>
          <div className="grid grid-cols-5 gap-x-4 gap-y-2">
            {seasonItems.map((option) => (
              <div key={option.value}>
                <input
                  type="checkbox"
                  value={option.value}
                  id={option.value}
                  {...register('seasons')}
                />
                <label htmlFor={option.value} className="ml-2">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
          <h3>Size</h3>
          <div className="grid grid-cols-4 gap-x-4 gap-y-2">
            {sizeItems.map((option) => (
              <div key={option.value}>
                <input
                  type="radio"
                  value={option.value}
                  id={option.value}
                  {...register('size')}
                />
                <label htmlFor={option.value} className="ml-2">
                  {option.label}
                </label>
              </div>
            ))}
          </div>

          <div>
            <label htmlFor="desc">Desc:</label>
            <input
              type="text"
              id="desc"
              {...register('desc', { required: true })}
            />
            {errors.desc && <span>This field is required</span>}
          </div>
          <div>
            <label htmlFor="rating">Rating:</label>
            <input
              type="text"
              id="rating"
              {...register('rating', { required: true })}
            />
            {errors.desc && <span>This field is required</span>}
          </div>

          <div>
            <label htmlFor="imageFile">Image:</label>
            <input
              type="file"
              accept="image/*"
              id="rating"
              {...register('imageFile', { required: true })}
            />
            {errors.desc && <span>This field is required</span>}
          </div>

          <button type="submit">Submit</button>
        </div>
        <div>
          <p>Selected category: {watchCategoryOption || 'None'}</p>
          <p>Selected Size: {watchSizeOption || 'None'}</p>
          <p>Selected Seasons: {watchSeasonOptions?.join(', ') || 'None'}</p>
          <p>Selected Name: {watchNameOption || 'None'}</p>
          <p>Selected Desc: {watchDescOption || 'None'}</p>
          <p>Selected Rating: {watchRatingOption || 'None'}</p>
        </div>
      </form>
    </div>
  );
};
