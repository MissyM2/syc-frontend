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
} from '../features/closet/Closetitem-datas.ts';

// import Error from '../components/Error';
// import Spinner from '../components/Spinner';

import { addClosetItem } from '../features/closet/closetActions.ts';

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
  image: FileList;
  imageUrl: string;
}

export const AddClosetitemPage: React.FC = () => {
  // const { loading, error} = useSelector((state: RootState) => state.auth);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const closetState = useSelector((state: RootState) => state.closet);
  const userState = useSelector((state: RootState) => state.user);
  const userId = useSelector((state: RootState) => state.auth.userInfo?._id);
  //const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    // control,
    // watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      userId: userInfo?._id,
      category: '',
      itemName: '',
      seasons: [],
      size: '',
      desc: '',
      rating: '',
      imageId: '',
      imageUrl: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await dispatch(addClosetItem(data));
      if (response) {
        // console.log(
        //   'show closetitem state after adding item. ' +
        //     JSON.stringify(closetState)
        // );
        console.log(
          'show user state after adding item. ' +
            JSON.stringify(userState.userInfo?.closetitems.length)
        );
      }
      if (response) {
        navigate('/home');
      }
    } catch (error) {
      alert('Submitting form failed!');
    }
  };

  // if (loading) {
  //   return <p>Loading Closet Items...</p>;
  // }

  // if (error) {
  //   return <p>Error: {error}</p>;
  // }

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      // Assuming you want to store the file name
      setValue('imageId', file.name);
      // You might also want to store the file object itself for later use
      // setValue('imageFile', file);
    }
  };

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
              htmlFor="imageFile"
            >
              ImageFile
            </label>
            <input
              type="file"
              accept="image/*"
              required
              id="imageFile"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register('image', { required: true })}
              onChange={handleImageChange}
            />
            {/* {errors.desc && <span>This field is required</span>} */}
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

        {/* <div>
          <p>Selected category: {watchCategoryOption || 'None'}</p>
          <p>Selected Size: {watchSizeOption || 'None'}</p>
          <p>Selected Seasons: {watchSeasonOptions?.join(', ') || 'None'}</p>
          <p>Selected Name: {watchNameOption || 'None'}</p>
          <p>Selected Desc: {watchDescOption || 'None'}</p>
          <p>Selected Rating: {watchRatingOption || 'None'}</p>
        </div> */}
      </form>
      {/* <div>
        {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
        <p>{message}</p>
      </div> */}
    </div>
  );
};
