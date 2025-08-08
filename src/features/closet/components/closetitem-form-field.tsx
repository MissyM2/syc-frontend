// components/form/form-field.tsx
import type { Control, FieldValues, Path } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'; // Assuming shadcn/ui Form components
import { ClosetitemInput } from '@/components/ui/closetitem-input'; // Your custom input

interface ClosetitemFormFieldProps<
  TFieldValues extends FieldValues = FieldValues
> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  description?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  // Add any other props you want to pass to your CustomInput
}

export default function ClosetitemFormField<
  TFieldValues extends FieldValues = FieldValues
>({
  control,
  name,
  label,
  description,
  placeholder,
  type = 'text',
  ...inputProps // Pass any extra props to CustomInput
}: ClosetitemFormFieldProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <ClosetitemInput
              type={type}
              placeholder={placeholder}
              {...field} // This connects the input to react-hook-form
              {...inputProps} // Pass through any additional props
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
