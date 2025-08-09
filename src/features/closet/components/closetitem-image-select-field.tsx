import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'; // Assuming shadcn/ui Form components
import { ClosetitemInput } from '@/components/ui/closetitem-input'; // Your custom input

interface ClosetitemImageSelectFieldProps {
  name: string;
  label: string;
}

export default function ImageSelectField({
  name,
  label,
}: ClosetitemImageSelectFieldProps) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange, ...fieldProps } }) => (
        <FormItem>
          <div className="flex flex-row justify-between">
            <FormLabel className="text-sm font-normal">{label}</FormLabel>
            <FormControl>
              <ClosetitemInput
                className="w-25"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  onChange(e.target.files ? e.target.files[0] : null)
                }
                {...fieldProps}
              />
            </FormControl>
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
