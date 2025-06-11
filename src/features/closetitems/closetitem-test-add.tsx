import React from 'react';
import type { FormData, ValidFieldNames } from '../../types/Types.tsx';
import { ClosetitemSchema } from '../../types/Types.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import FormField from './ui/FormField.tsx';
import { useNavigate } from 'react-router-dom';

import { createClosetitem } from './closetitem-api.ts';

export const ClosetItemAddPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(ClosetitemSchema),
    // defaultValues: {
    //   dateCreated: new Date(),
    // },
  });

  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    const modifiedData = {
      ...data,
      dateCreated: new Date(),
      imageId: data.imageFile.name,
    };

    try {
      const response = await createClosetitem(modifiedData);
      const { errors = {} } = response?.data; // Destructure the 'errors' property from the response data

      //   // Define a mapping between server-side field names and their corresponding client-side names
      //   const fieldErrorMapping: Record<string, ValidFieldNames> = {
      //     category: 'category',
      //     name: 'name',
      //     // season: 'season',
      //     // size: 'size',
      //     // desc: 'desc',
      //     // rating: 'rating',
      //     // imageFile: 'imageFile',
      //   };

      //   // Find the first field with an error in the response data
      //   const fieldWithError = Object.keys(fieldErrorMapping).find(
      //     (field) => errors[field]
      //   );

      //   // If a field with an error is found, update the form error state using setError
      //   if (fieldWithError) {
      //     // Use the ValidFieldNames type to ensure the correct field names
      //     setError(fieldErrorMapping[fieldWithError], {
      //       type: 'server',
      //       message: errors[fieldWithError],
      //     });
      //   }
      if (response) {
        navigate('/home');
      }
    } catch (error) {
      alert('Submitting form failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid col-auto">
        <h1 className="text-3xl font-bold mb-4">React-Hook-Form & Zod</h1>
        <FormField
          type="text"
          placeholder="Category"
          name="category"
          register={register}
          error={errors.category}
        />
        <FormField
          type="text"
          placeholder="Name"
          name="name"
          register={register}
          error={errors.name}
        />
        <FormField
          type="text"
          placeholder="Season"
          name="season"
          register={register}
          error={errors.season}
        />
        <FormField
          type="text"
          placeholder="Size"
          name="size"
          register={register}
          error={errors.size}
        />
        <FormField
          type="text"
          placeholder="Desc"
          name="desc"
          register={register}
          error={errors.desc}
        />
        <FormField
          type="text"
          placeholder="Rating"
          name="rating"
          register={register}
          error={errors.rating}
        />

        <FormField
          type="file"
          placeholder="ImageFile"
          name="imageFile"
          register={register}
          error={errors.imageFile}
        />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};
