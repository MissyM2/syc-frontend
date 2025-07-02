// import React from 'react';
// import type { FormData, ValidFieldNames } from '../../types/Types.tsx';
// import { ClosetitemSchema } from '../../types/Types.tsx';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm, Controller } from 'react-hook-form';
// import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
// import * as LabelPrimitive from '@radix-ui/react-label';
// import { CheckIcon } from '@radix-ui/react-icons';
// //import FormField from './ui/FormField.tsx';
// import { useNavigate } from 'react-router-dom';
// import type { Option } from '@/interfaces/Interfaces.tsx';

// import { createClosetitem } from './closetitem-api.ts';

// import { categoryItems, seasonItems, sizeItems } from './Closetitem-datas.ts';

// import { Input } from '../../components/ui/input.tsx';
// import { Button } from '../../components/ui/button.tsx';

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';

// import {
//   Form,
//   FormControl,
//   FormLabel,
//   FormField,
//   FormItem,
//   FormMessage,
// } from '@/components/ui/form';

// export const CreateClosetitemPage: React.FC = () => {
//   // const {
//   //   register,
//   //   handleSubmit,
//   //   formState: { errors },
//   //   setError,
//   //   watch,
//   // } = useForm<FormData>({
//   //   resolver: zodResolver(ClosetitemSchema),
//   //   // defaultValues: {
//   //   //   dateCreated: new Date(),
//   //   // },
//   // });
//   const form = useForm<FormData>({
//     resolver: zodResolver(ClosetitemSchema),
//     // defaultValues: {
//     //   dateCreated: new Date(),
//     // },
//   });

//   const navigate = useNavigate();

//   const onSubmit = async (data: FormData) => {
//     console.log('inside onSubmit');
//     // const modifiedData = {
//     //   ...data,
//     //   dateCreated: new Date(),
//     //   imageId: data.imageFile.name,
//     // };

//     // try {
//     //   const response = await createClosetitem(modifiedData);
//     //   const { errors = {} } = response?.data; // Destructure the 'errors' property from the response data

//     //   // Define a mapping between server-side field names and their corresponding client-side names
//     //   const fieldErrorMapping: Record<string, ValidFieldNames> = {
//     //     category: 'category',
//     //     name: 'name',
//     //     // season: 'season',
//     //     // size: 'size',
//     //     // desc: 'desc',
//     //     // rating: 'rating',
//     //     // imageFile: 'imageFile',
//     //   };

//     //   // Find the first field with an error in the response data
//     //   const fieldWithError = Object.keys(fieldErrorMapping).find(
//     //     (field) => errors[field]
//     //   );

//     //   // If a field with an error is found, update the form error state using setError
//     //   if (fieldWithError) {
//     //     // Use the ValidFieldNames type to ensure the correct field names
//     //     setError(fieldErrorMapping[fieldWithError], {
//     //       type: 'server',
//     //       message: errors[fieldWithError],
//     //     });
//     //   }
//     //   if (response) {
//     //     navigate('/home');
//     //   }
//     // } catch (error) {
//     //   alert('Submitting form failed!');
//     // }
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)}>
//         <div className="grid col-auto">
//           <h1 className="text-3xl font-bold mb-4">React-Hook-Form & Zod</h1>
//           <div>
//             <FormLabel>Season</FormLabel>
//             <FormField
//               control={form.control}
//               name="category"
//               render={({ field }) => (
//                 <FormItem>
//                   <Select
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <FormControl className="w-full text-xl lg:text-2xl lg:mb-3">
//                       <SelectTrigger>
//                         <SelectValue placeholder="Category" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       {categoryItems.map((option: Option) => (
//                         <SelectItem
//                           className="text-lg"
//                           key={option.value}
//                           value={option.value}
//                         >
//                           {option.label}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <div>
//             <FormLabel>Name</FormLabel>
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input
//                       type="text"
//                       placeholder="Name"
//                       className="text-xl lg:text-2xl w-full lg:mb-3"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           THE RIGHT ONE
//           <div>
//             {seasonItems.map((option) => (
//               <div key={option.value} className="flex items-center bg-green-50">
//                 <Controller
//                   name="seasons"
//                   control={form.control}
//                   defaultValue={[]}
//                   render={({ field }) => (
//                     <LabelPrimitive.Root>
//                       <CheckboxPrimitive.Root
//                         checked={field.value.includes(option.value)}
//                         onCheckedChange={(checked) => {
//                           if (checked) {
//                             field.onChange([...field.value, option.value]);
//                           } else {
//                             field.onChange(
//                               field.value.filter((val) => val !== option.value)
//                             );
//                           }
//                         }}
//                       >
//                         <CheckboxPrimitive.Indicator>
//                           <CheckIcon />
//                         </CheckboxPrimitive.Indicator>
//                       </CheckboxPrimitive.Root>
//                       {option.label}
//                     </LabelPrimitive.Root>
//                   )}
//                 />
//               </div>
//             ))}
//           </div>
//           <div>
//             <FormLabel>Size</FormLabel>
//             <FormField
//               control={form.control}
//               name="size"
//               render={({ field }) => (
//                 <FormItem>
//                   <Select
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <FormControl className="w-full text-xl lg:text-2xl lg:mb-3">
//                       <SelectTrigger>
//                         <SelectValue placeholder="Size" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       {sizeItems.map((option: Option) => (
//                         <SelectItem key={option.value} value={option.value}>
//                           {option.label}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <div>
//             <FormLabel>Desc</FormLabel>
//             <FormField
//               control={form.control}
//               name="desc"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input
//                       type="text"
//                       placeholder="Desc"
//                       className="text-xl lg:text-2xl w-full mb-2 lg:mb-3"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <div>
//             <FormLabel>Rating</FormLabel>
//             <FormField
//               control={form.control}
//               name="rating"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input
//                       type="text"
//                       placeholder="Rating"
//                       className="text-xl lg:text-2xl w-full mb-2 lg:mb-3"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <div>
//             <FormLabel>Image File</FormLabel>
//             <FormField
//               control={form.control}
//               name="imageFile"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input
//                       type="file"
//                       placeholder="Select image"
//                       className="text-xl lg:text-2xl w-full mb-2 lg:mb-3"
//                       name={field.name}
//                       ref={field.ref}
//                       onChange={(e) => field.onChange(e.target.files)}
//                       onBlur={field.onBlur}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//         </div>
//         <div>
//           <Button type="submit">Save Item</Button>
//         </div>
//       </form>
//     </Form>
//   );
// };
