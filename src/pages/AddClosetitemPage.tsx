import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
//import { Button, Form } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import type { RootState, AppDispatch } from '@/app/store.ts';

import {
  seasonItems,
  sizeItems,
  categoryItems,
  colorItems,
  occasionItems,
} from '@/features/closet/Closetitem-datas.ts';

// import Error from '@/components/Error';
// import Spinner from '@/components/Spinner';

import { addClosetitem } from '@/features/closet/closetActions.ts';
import type { AddClosetitemArgs } from '@/interfaces/closetInterfaces';

//import { resetSlice } from '@/features/closet/closetSlice.ts';

const AddClosetitemPage: React.FC = () => {
  const { status, error } = useSelector((state: RootState) => state.user);
  //const { currentUser } = useSelector((state: RootState) => state.user);
  //const closetState = useSelector((state: RootState) => state.closet);
  //const userState = useSelector((state: RootState) => state.user);
  const userId = useSelector((state: RootState) => state.user.currentUser?._id);
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
  } = useForm<AddClosetitemArgs>({
    defaultValues: {
      userId: userId,
      closetType: 'personal',
      itemName: '',
      itemDetails: {
        category: 'tops',
        seasons: ['summer'],
        size: 'M ',
        color: 'black',
        occasion: 'c',
      },
      desc: 'Add three of four descriptive terms here',
      rating: '',
      imageId: '',
      imageUrl: '',
    },
  });

  const onSubmit: SubmitHandler<AddClosetitemArgs> = async (data) => {
    try {
      console.log(
        'show closetitem state after before item. ' + JSON.stringify(data)
      );
      //dispatch(resetSlice());
      const response = await dispatch(addClosetitem(data));
      if (response) {
        console.log(
          'show closetitem state after adding item. ' + JSON.stringify(response)
        );
      }
      // console.log(
      //   'show closetitem state after adding item. ' +
      //     JSON.stringify(userState)
      // );
      // console.log(
      //   'show user state after adding item. ' +
      //     JSON.stringify(userState.currentUser?.closetitems.length)
      // );
      // }
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
              id="closetType"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Closet Type"
              {...register('closetType', { required: true })}
            />
            {errors.closetType && <span>This field is required</span>}
          </div>
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
          <div>ITEM DETAILS GOES HERE</div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="itemDetails.category"
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
                    {...register('itemDetails.category')}
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
              htmlFor="itemDetails.seasons"
            >
              Seasons:
            </label>
            <div className="grid grid-cols-5 gap-x-4 gap--2">
              {seasonItems.map((option) => (
                <div key={option.value}>
                  <input
                    type="checkbox"
                    value={option.value}
                    id={option.value}
                    {...register('itemDetails.seasons')}
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
              htmlFor="itemDetails.size"
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
                    {...register('itemDetails.size')}
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
              htmlFor="itemDetails.color"
            >
              Color
            </label>
            <div className="grid grid-cols-4 gap-x-4 gap-y-2">
              {colorItems.map((option) => (
                <div key={option.value}>
                  <input
                    type="radio"
                    value={option.value}
                    id={option.value}
                    {...register('itemDetails.color')}
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
              htmlFor="itemDetails.occasion"
            >
              Occasion
            </label>
            <div className="grid grid-cols-4 gap-x-4 gap-y-2">
              {occasionItems.map((option) => (
                <div key={option.value}>
                  <input
                    type="radio"
                    value={option.value}
                    id={option.value}
                    {...register('itemDetails.occasion')}
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
              Description:
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
      </form>
    </div>
  );
};

export default AddClosetitemPage;
