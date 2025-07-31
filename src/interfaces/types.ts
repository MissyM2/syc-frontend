export const UserRole = {
  Admin: 'admin',
  User: 'user',
  Guest: 'guest',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

// import type { FieldError, UseFormRegister } from 'react-hook-form';

// import { z } from 'zod';
// import type { ZodType } from 'zod';

// export type Season = 'Winter' | 'Spring' | 'Summer' | 'Fall';

// export type Size = 'S' | 'M' | 'L' | 'N/A';

// export type Category =
//   | 'Clothing'
//   | 'Footwear'
//   | 'Outerwear'
//   | 'Sportswear'
//   | 'Accessories';

// export type SortOption = 'asc' | 'desc';

// export type FormData = {
//   category: string;
//   name: string;
//   seasons: string[];
//   size: string;
//   desc: string;
//   rating: string;
//   //dateCreated: Date;
//   imageId: string;
//   imageFile: File;
// };
// const MAX_FILE_SIZE = 5000000;

// const ACCEPTED_IMAGE_TYPES = [
//   'image/jpeg',
//   'image/jpg',
//   'image/png',
//   'image/webp',
// ];

// export const ClosetitemSchema: ZodType<FormData> = z.object({
//   category: z.string({
//     required_error: 'Please select an category to display.',
//   }),
//   name: z
//     .string({
//       required_error: 'Please add a title.',
//     })
//     .min(5),
//   seasons: z
//     .array(z.string())
//     .refine((value) => value.some((item) => item), {
//       message: 'You have to select at least one item.',
//     })
//     .transform((val) => val as string[]), // Ensures output is string[]
//   // season: z.string({
//   //   required_error: 'Please select a season.',
//   // }),
//   size: z.string({
//     required_error: 'Please select an size.',
//   }),
//   desc: z
//     .string({
//       required_error: 'Please add a description.',
//     })
//     .min(10),
//   rating: z.string({
//     required_error: 'Please add a rating.',
//   }),
//   //dateCreated: z.date(),
//   imageId: z.string(),
//   imageFile: z
//     .any() // or z.instanceof(File)
//     .refine((files) => files?.length === 1, 'Image is required.') // Check if a file is uploaded
//     .refine(
//       (files) => files?.[0]?.size <= MAX_FILE_SIZE,
//       `Max file size is ${MAX_FILE_SIZE / 1000000}MB.`
//     ) // Check file size
//     .refine(
//       (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), // Check file type
//       '.jpg, .jpeg, .png and .webp files are accepted.'
//     )
//     .transform((files) => files[0]),
// });

// export type FormFieldProps = {
//   type: string;
//   placeholder: string;
//   name: ValidFieldNames;
//   register: UseFormRegister<FormData>;
//   error: FieldError | undefined;
//   valueAsNumber?: boolean;
// };

// export type ValidFieldNames =
//   | 'category'
//   | 'name'
//   | 'seasons'
//   | 'size'
//   | 'desc'
//   | 'rating'
//   // | 'dateCreated';
//   // | 'imageId'
//   | 'imageFile';
