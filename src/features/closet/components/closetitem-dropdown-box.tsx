// components/form/form-field.tsx
import type { Control, FieldValues, Path } from 'react-hook-form';
import { Label } from '@/components/ui/label'; // shadcn/ui Label
import type { Option } from '@/interfaces/types.tsx';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ClosetitemDropdownBoxProps<
  TFieldValues extends FieldValues = FieldValues
> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  description?: string;
  items: Option[];
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  // Add any other props you want to pass to your CustomInput
}

export default function ClosetitemDropdownBox<
  TFieldValues extends FieldValues = FieldValues
>({
  control,
  name,
  label,
  description,
  items,
  ...inputProps // Pass any extra props to CustomInput
}: ClosetitemDropdownBoxProps<TFieldValues>) {
  return (
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex flex-row justify-between items-center">
            <FormLabel>{label}</FormLabel>

            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl className="text-xs md:text-sm text-muted-foreground">
                <SelectTrigger className="border-none outline-none shadow-none focus:ring-0 focus:ring-offset-0 p-0">
                  <SelectValue className="" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="">
                {items.map((item) => (
                  <SelectItem
                    className="text-xs md:text-sm"
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
