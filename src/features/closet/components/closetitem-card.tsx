import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../app/store.ts';
import { useForm, FormProvider } from 'react-hook-form';
import { deleteClosetitem } from '../closetActions.ts';
import { UpdateClosetitemSchema } from '@/schemas/closetSchemas.ts';
import type {
  BaseClosetitemType,
  UpdateClosetitemInput,
} from '@/schemas/closetSchemas.ts';
import { updateClosetitem } from '@/features/closet/closetActions.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FaMinus } from 'react-icons/fa6';
//import { FaEdit } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { FaRegSave } from 'react-icons/fa';
import RoundButtonSmall from './RoundButtonSmall.tsx';
import { ClosetitemDetailsForm } from '@/features/closet/components/closetitem-details-form.tsx';
import ClosetitemFormField from '@/features/closet/components/closetitem-form-field.tsx';
import ClosetitemDropdownBox from '@/features/closet/components/closetitem-dropdown-box.tsx';
// import ClosetitemImage from '@/features/closet/components/closetitem-image.tsx';
// import ClosetitemImageSelectField from '@/features/closet/components/closetitem-image-select-field.tsx';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  Card,
  //CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { closetTypes } from '@/features/closet/Closetitem-datas';
import type {
  IClosetitem,
  IUpdateClosetitem,
} from '@/interfaces/closetTypes.ts';

interface ClosetitemCardProps {
  closetitem: IClosetitem;
}

export const ClosetitemCard: React.FC<ClosetitemCardProps> = ({
  closetitem,
}): React.JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  //const { control } = useFormContext();

  // Initialize React Hook Form with Zod resolver
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { dirtyFields },
  //   watch,
  // } = useForm<IClosetitem>({
  const form = useForm<UpdateClosetitemInput>({
    defaultValues: {
      _id: closetitem._id,
      closetType: closetitem.closetType,
      itemName: closetitem.itemName,
      itemDetails: closetitem.itemDetails,
      additionalDesc: closetitem.additionalDesc,
      imageUrl: closetitem.imageUrl,
      userId: closetitem.userId,
    },
  });

  const {
    formState: { dirtyFields },
  } = form;

  const handleDelete = () => {
    //console.log('inside handleDelete');
    dispatch(
      deleteClosetitem({
        _id: closetitem._id,
        userId: closetitem.userId,
        imageId: closetitem.imageId,
      })
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handleImageChange: Image file selected:', e.target.files);
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImageFile(e.target.files[0]);
    } else {
      setSelectedImageFile(null);
    }
  };

  // Define the submit handler
  const onSubmit = async (data: UpdateClosetitemInput) => {
    try {
      // Build update payload with only changed fields
      const updatePayload: Partial<IUpdateClosetitem> = {};

      // Check each field individually with proper type safety
      if (dirtyFields.closetType) {
        updatePayload.closetType = data.closetType;
      }

      if (dirtyFields.itemName) {
        updatePayload.itemName = data.itemName;
      }

      if (dirtyFields.itemDetails) {
        updatePayload.itemDetails = {
          category:
            data.itemDetails?.category ||
            closetitem.itemDetails?.category ||
            '',
          seasons:
            data.itemDetails?.seasons || closetitem.itemDetails?.seasons || [],
          size: data.itemDetails?.size || closetitem.itemDetails?.size || '',
          color: data.itemDetails?.color || closetitem.itemDetails?.color || '',
          occasion:
            data.itemDetails?.occasion ||
            closetitem.itemDetails?.occasion ||
            '',
          rating:
            data.itemDetails?.rating || closetitem.itemDetails?.rating || '',
        };
      }

      if (dirtyFields.additionalDesc) {
        updatePayload.additionalDesc = data.additionalDesc;
      }

      if (dirtyFields.imageFile && selectedImageFile) {
        // Create a new FileList with the selected file
        const fileList = new DataTransfer();
        fileList.items.add(selectedImageFile);
        updatePayload.imageFile = fileList.files;
      } else {
        updatePayload.imageFile = closetitem.imageFile;
      }

      // Ensure required fields are present
      const itemId = data._id || closetitem._id;
      if (!itemId) {
        throw new Error('Item ID is required for update');
      }
      // Ensure required fields are present
      const imageId = data.imageId || closetitem.imageId;
      if (!imageId) {
        throw new Error('Image ID is required for update');
      }

      // Always include required fields
      updatePayload._id = itemId;
      updatePayload.userId = closetitem.userId;
      updatePayload.imageId = imageId;
      //updatePayload.updatedAt = new Date().toISOString();

      console.log('Update payload:', JSON.stringify(updatePayload));

      const response = await dispatch(
        updateClosetitem(updatePayload as IUpdateClosetitem)
      );

      if (response) {
        console.log('Is Update successful:', response);
      }
    } catch (error) {
      alert('Submitting form failed!');
    }
  };

  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="w-full max-w-sm p-4">
            <div className="flex justify-end">
              <div className="ps-1 pe-1">
                <RoundButtonSmall onClick={handleDelete}>
                  <FaMinus className="h-4 w-4" />
                </RoundButtonSmall>
              </div>
              <div className="mb-6"></div>
              <div className="ps-1 pe-1">
                <RoundButtonSmall onClick={form.handleSubmit(onSubmit)}>
                  <FaRegSave className="h-4 w-4" />
                </RoundButtonSmall>
              </div>
            </div>
            <CardHeader>
              {/* Item Name */}
              <ClosetitemFormField
                control={form.control}
                name="itemName"
                label="Item Name"
                placeholder="Item Name"
              />
            </CardHeader>
            {/* Closetitem Image */}
            <div className="border-b border-gray-200 pt-2pb-2 mb-2">
              {/* <ClosetitemImage
                imageUrl={closetitem.imageUrl}
                itemName={closetitem.itemName}
              />
              <ClosetitemImageSelectField
                name="imageFile"
                label="Select different image"
              /> */}
              <div className="grid w-full place-items-center overflow-x-scroll aspect-square bg-gray-200">
                {closetitem.imageUrl && (
                  <img
                    className=""
                    src={closetitem.imageUrl}
                    alt={closetitem.itemName}
                  />
                )}
              </div>
              <FormField
                control={form.control}
                name="imageFile"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem className="space-y-2">
                    <div className="flex flex-row justify-between">
                      <FormLabel>Change Image</FormLabel>
                      <FormControl>
                        <Input
                          className="w-50"
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
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <CardContent className="flex-col gap-0">
              <div className="flex flex-col gap-0">
                <div className="flex flex-col gap-1">
                  {/* Closet Type */}
                  <ClosetitemDropdownBox
                    control={form.control}
                    name="closetType"
                    label="Closet Type"
                    description="Select a closet type"
                    items={closetTypes}
                  />

                  <ClosetitemDetailsForm />

                  {/* Additional Description */}
                  <div>
                    <ClosetitemFormField
                      control={form.control}
                      name="additionalDesc"
                      label="Additional Description"
                      placeholder="Additional Description"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </FormProvider>
    </>
  );
};
