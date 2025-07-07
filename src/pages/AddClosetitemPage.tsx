import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
//import { Button, Form } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';
import {
  seasonItems,
  sizeItems,
  categoryItems,
} from '../features/closetitem/Closetitem-datas.ts';

import Error from '../components/Error';
import Spinner from '../components/Spinner';

import { addClosetitemWithImage } from '../features/closetitem/closetitemActions.ts';

interface Option {
  value: string;
  label: string;
}

interface FormData {
  userId: string;
  category: string;
  itemName: string;
  seasons: string[];
  size: string;
  desc: string;
  rating: string;
  imageId: string;
  imageFile: FileList;
}

export const AddClosetitemPage: React.FC = () => {
  //const { loading, error } = useSelector((state: RootState) => state.auth);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      category: '',
      itemName: '',
      seasons: [],
      size: '',
      desc: '',
      rating: '',
      imageId: '',
    },
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    //console.log('data: ' + JSON.stringify(data));
    if (data.imageFile && data.imageFile.length > 0) {
      //console.log('what is userInfo? ' + JSON.stringify(userInfo));
      const userId = userInfo._id;
      //console.log('what is userID? ' + userId);
      const file = data.imageFile[0];
      //console.log('Selected image:', file);
      const modifiedData = {
        ...data,
        userId: userId,
        //userToken: userToken,
        imageId: file.name,
        imageFile: file,
      };

      console.log(
        'modified data: imageId' + JSON.stringify(modifiedData.imageId)
      );

      // try {
      const response = dispatch(addClosetitemWithImage(modifiedData));
      console.log(
        'AddClosetitemPage,  onSubmit: what is response? ' +
          JSON.stringify(response)
      );
      //   const { errors = {} } = response?.data;
      //   if (response) {
      //     navigate('/home');
      //   }
      // } catch (error) {
      //   alert('Submitting form failed!');
      // }
      // } else {
      //   return;
    }
  };

  const watchSeasonOptions = watch('seasons');
  const watchSizeOption = watch('size');
  const watchCategoryOption = watch('category');
  const watchNameOption = watch('itemName');
  const watchDescOption = watch('desc');
  const watchRatingOption = watch('desc');

  // if (loading) {
  //   return <p>Loading Closet Items...</p>;
  // }

  // if (error) {
  //   return <p>Error: {error}</p>;
  // }

  return (
    <div className="w-full max-w-lg">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="itemName"
            >
              Name:
            </label>
            <input
              type="text"
              id="nameitemName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Name"
              {...register('itemName', { required: true })}
            />
            {errors.itemName && <span>This field is required</span>}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="category"
            >
              Category:
            </label>

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
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="category"
            >
              Seasons:
            </label>
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
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="category"
            >
              Size
            </label>
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
          </div>

          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="desc"
            >
              Desc:
            </label>
            <input
              type="text"
              id="desc"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register('desc', { required: true })}
            />
            {errors.desc && <span>This field is required</span>}
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="rating"
            >
              Rating:
            </label>
            <input
              type="text"
              id="rating"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register('rating', { required: true })}
            />
            {errors.desc && <span>This field is required</span>}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="category"
            >
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              id="rating"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register('imageFile', { required: true })}
            />
            {errors.desc && <span>This field is required</span>}
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="relative text-sm p-2 bg-red-200 text-black-500 rounded-sm ease-in-out"
              //disabled={loading}
            >
              Add Closet Item
            </button>
          </div>
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
