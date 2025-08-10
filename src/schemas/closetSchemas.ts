import { z } from 'zod';

export const closetitemDetailsSchema = z.object({
  category: z.string().min(1, { message: 'Category is required' }),
  seasons: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one season.',
  }),
  size: z.string().min(1, { message: 'Size is required' }),
  color: z.string().min(1, { message: 'Color is required' }),
  occasion: z.string().min(1, { message: 'Occasion is required' }),
  rating: z.string().min(1, { message: 'Rating is required' }),
});

export const BaseClosetitemSchema = z.object({
  _id: z.string().min(1, { message: 'Item ID is required' }),
  userId: z.string().min(1, { message: 'User ID is required' }),
  closetType: z.enum(['personal', 'personalOnly', 'donation', 'sharing'], {
    required_error: 'You need to select a closet type.',
  }),
  itemName: z.string().min(1, { message: 'Item Name is required' }),
  itemDetails: closetitemDetailsSchema,
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

// This schema is used for adding a new closet item
export const AddClosetitemSchema = BaseClosetitemSchema;

// Schema for updating an item (requires an ID and allows partial updates)
export const UpdateClosetitemSchema = BaseClosetitemSchema.partial(); // Allows updating only a subset of fields

// Schema for deleting an item (only requires an ID)
export const DeleteClosetitemSchema = z.object({
  closetitemId: z.string().uuid('Invalid item ID format'),
});

// Schema for reading a single item (only ID required)
export const ReadOneClosetitemSchema = z.object({
  closetitemId: z.string().uuid('Invalid item ID'),
});

// Schema for reading all items (no specific input needed for this operation itself)
// This is typically handled by a function that fetches data, not a schema for input validation.
// However, if there were query parameters for filtering/pagination, a schema would be used for those.
// For example:
export const ReadAllClosetitemsQuerySchema = z.object({
  limit: z.number().int().positive().optional(),
  offset: z.number().int().nonnegative().optional(),
  sortBy: z.enum(['name', 'price']).optional(),
});

// Infer types from schemas
export type BaseClosetitemType = z.infer<typeof BaseClosetitemSchema>;
export type AddClosetitemInput = z.infer<typeof AddClosetitemSchema>;
export type UpdateClosetitemInput = z.infer<typeof UpdateClosetitemSchema>;
export type DeleteClosetitemInput = z.infer<typeof DeleteClosetitemSchema>;
export type ReadOneClosetitemInput = z.infer<typeof ReadOneClosetitemSchema>;
export type ReadAllClosetitemsQuery = z.infer<
  typeof ReadAllClosetitemsQuerySchema
>;

// You might also want a type for the full item structure if it has an ID
export type Closetitem = z.infer<typeof BaseClosetitemSchema> & { id: string };
