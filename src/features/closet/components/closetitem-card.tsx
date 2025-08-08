import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../app/store.ts';
import { useForm, FormProvider } from 'react-hook-form';
import { deleteClosetitem } from '../closetActions.ts';
import { closetitemFullFormSchema } from '@/schemas/closetitemFormSchema.ts';
import type { closetitemFormValues } from '@/schemas/closetitemFormSchema.ts';
import { updateClosetitem } from '@/features/closet/closetActions.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Closetitem } from '../../../interfaces/closetInterfaces.ts';
import { FaMinus } from 'react-icons/fa6';
//import { FaEdit } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
//import { FaRegSave } from 'react-icons/fa';
import RoundButtonSmall from './RoundButtonSmall.tsx';
import { ItemDetailsForm } from '@/features/closet/components/ItemDetailsForm.tsx';
import ClosetitemFormField from '@/features/closet/components/closetitem-form-field.tsx';
import ClosetitemDropdownBox from '@/features/closet/components/closetitem-dropdown-box.tsx';

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

interface ClosetitemProps {
  closetitem: Closetitem;
}

export const ClosetitemCard: React.FC<ClosetitemProps> = ({
  closetitem,
}): React.JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector((state: RootState) => state.user);

  //const { control } = useFormContext();

  // Initialize React Hook Form with Zod resolver
  const form = useForm<z.infer<typeof closetitemFullFormSchema>>({
    resolver: zodResolver(closetitemFullFormSchema),
    defaultValues: {
      itemId: closetitem._id,
      userId: closetitem.userId,
      closetType: closetitem.closetType as
        | 'personal'
        | 'personalOnly'
        | 'donation'
        | 'sharing',

      itemName: closetitem.itemName,
      itemDetails: {
        category: closetitem.itemDetails?.category || '',
        //   seasons: closetitem.itemDetails.seasons,
        size: closetitem.itemDetails.size,
        color: closetitem.itemDetails.color,
        occasion: closetitem.itemDetails.occasion,
        rating: closetitem.itemDetails.rating,
      },
      additionalDesc: closetitem.additionalDesc,
      // imageId: closetitem.imageId,
      // imageUrl: closetitem.imageUrl,
    },
  });

  const handleDelete = () => {
    //console.log('inside handleDelete');
    dispatch(
      deleteClosetitem({
        closetitemId: closetitem._id,
        userId: closetitem.userId,
        imageId: closetitem.imageId,
      })
    );
  };

  // Define the submit handler
  const onSubmit = async (data: closetitemFormValues) => {
    try {
      console.log('Submitting form with data:', data);
      const response = await dispatch(updateClosetitem(data));
      if (response) {
        console.log(
          'show closetitem state after adding item. ' + JSON.stringify(response)
        );
      }
    } catch (error) {
      alert('Submitting form failed!');
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="bg-white shadow-md rounded px-2 pt-2 pb-2 mb-4 space-y-0 "
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Card className="w-full max-w-sm">
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

                <ItemDetailsForm />

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
        <div className="mb-6">
          <Button
            type="submit"
            className="relative text-sm p-2 bg-red-200 text-black-500 rounded-sm ease-in-out"
            //disabled={loading}
          >
            Update Closet Item
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
