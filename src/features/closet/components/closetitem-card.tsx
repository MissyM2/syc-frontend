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
//import { FaRegSave } from 'react-icons/fa';
import RoundButtonSmall from './RoundButtonSmall.tsx';
import { ClosetitemDetailsForm } from '@/features/closet/components/closetitem-details-form.tsx';
import ClosetitemFormField from '@/features/closet/components/closetitem-form-field.tsx';
import ClosetitemDropdownBox from '@/features/closet/components/closetitem-dropdown-box.tsx';
import ClosetitemImage from '@/features/closet/components/closetitem-image.tsx';
import ClosetitemImageSelectField from '@/features/closet/components/closetitem-image-select-field.tsx';

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
import type { IUpdateClosetitem } from '@/interfaces/closetTypes.ts';

interface ClosetitemCardProps {
  closetitem: BaseClosetitemType;
}

export const ClosetitemCard: React.FC<ClosetitemCardProps> = ({
  closetitem,
}): React.JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector((state: RootState) => state.user);

  //const { control } = useFormContext();

  // Initialize React Hook Form with Zod resolver
  const form = useForm<z.infer<typeof UpdateClosetitemSchema>>({
    resolver: zodResolver(UpdateClosetitemSchema),
    defaultValues: {
      _id: closetitem._id,
      //userId: closetitem.userId,
      closetType: closetitem.closetType as
        | 'personal'
        | 'personalOnly'
        | 'donation'
        | 'sharing',

      itemName: closetitem.itemName,
      itemDetails: {
        category: closetitem.itemDetails?.category || '',
        seasons: closetitem.itemDetails.seasons,
        size: closetitem.itemDetails.size,
        color: closetitem.itemDetails.color,
        occasion: closetitem.itemDetails.occasion,
        rating: closetitem.itemDetails.rating,
      },
      additionalDesc: closetitem.additionalDesc,
      // imageId: closetitem.imageId,
      imageUrl: closetitem.imageUrl,
    },
  });

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

  const handleSelectDifferentImage = () => {
    console.log('inside handleSelectDifferentImage');
    // dispatch an action
    // select a different image
    // delete current image from S3
    // update the closetitem with the new image fileName and URL
  };

  // Define the submit handler
  const onSubmit = async (data: UpdateClosetitemInput) => {
    console.log('Submitting form with data:', JSON.stringify(data));
    console.log('Closetitem ID:', closetitem._id);
    console.log('what is closetitem:', JSON.stringify(closetitem));
    try {
      const updatePayload: IUpdateClosetitem = {
        ...data,
        _id: closetitem._id, // If this is required and not in your form
      };
      // const updatePayload: IUpdateClosetitem = {
      //   _id: closetitem._id, // Ensure ID is set
      //   userId: closetitem.userId, // Use existing userId
      //   closetType: data.closetType || closetitem.closetType,
      //   itemName: data.itemName || closetitem.itemName,
      //   itemDetails: {
      //     category:
      //       data.itemDetails?.category ||
      //       closetitem.itemDetails?.category ||
      //       '',
      //     seasons:
      //       data.itemDetails?.seasons || closetitem.itemDetails?.seasons || [],
      //     size: data.itemDetails?.size || closetitem.itemDetails?.size || '',
      //     color: data.itemDetails?.color || closetitem.itemDetails?.color || '',
      //     occasion:
      //       data.itemDetails?.occasion ||
      //       closetitem.itemDetails?.occasion ||
      //       '',
      //     rating:
      //       data.itemDetails?.rating || closetitem.itemDetails?.rating || '',
      //   },
      //   additionalDesc: data.additionalDesc || closetitem.additionalDesc || '',
      //   imageId: closetitem.imageId, // Preserve existing imageId
      //   imageUrl: data.imageUrl || closetitem.imageUrl,
      // };

      console.log('Update payload:', JSON.stringify(updatePayload));
      const response = await dispatch(updateClosetitem(updatePayload));
      if (response) {
        console.log('Update successful:', response);
        return response;
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
              {/* <div className="ps-1 pe-1">
              <RoundButtonSmall onClick={handleSave}>
                <FaRegSave className="h-4 w-4" />
              </RoundButtonSmall>
            </div> */}
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
              <ClosetitemImage
                imageUrl={closetitem.imageUrl}
                itemName={closetitem.itemName}
              />
              <ClosetitemImageSelectField
                name="imageFile"
                label="Select different image"
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
            <div className="mb-6">
              <Button
                type="submit"
                className="relative text-sm p-2 bg-red-200 text-black-500 rounded-sm ease-in-out"
                //disabled={loading}
              >
                Update Closet Item
              </Button>
            </div>
          </Card>
        </form>
      </FormProvider>
    </>
  );
};
