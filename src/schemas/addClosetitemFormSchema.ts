import { z } from 'zod';

export const addClosetitemFormSchema = z.object({
  userId: z.string().min(1, { message: 'User ID is required' }),
  closetType: z.enum(['personal', 'personalOnly', 'donation', 'sharing'], {
    required_error: 'You need to select a closet type.',
  }),
  itemName: z.string().min(1, { message: 'Item Name is required' }),
  itemDetails: z.object({
    category: z.string().min(1, { message: 'Category is required' }),
    seasons: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: 'You have to select at least one season.',
    }),
    size: z.string().min(1, { message: 'Size is required' }),
    color: z.string().min(1, { message: 'Color is required' }),
    occasion: z.string().min(1, { message: 'Occasion is required' }),
    rating: z.string().min(1, { message: 'Rating is required' }),
  }),
  additionalDesc: z
    .string()
    .min(1, { message: 'Additional Description is required' }),
  imageFile: z
    .instanceof(FileList, { message: 'Image is required.' })
    .refine((fileList) => fileList.length > 0, {
      message: 'Please select an image.',
    })
    .refine((fileList) => fileList[0].type.startsWith('image/'), {
      message: 'Only image files are allowed.',
    }),
  imageId: z.string().min(1, { message: 'Image ID is required' }),
  imageUrl: z.string().min(1, { message: 'Image URL is required' }),
});

export type AddClosetitemFormSchemaType = z.infer<
  typeof addClosetitemFormSchema
>;
