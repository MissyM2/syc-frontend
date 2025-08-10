// components/form/form-field.tsx
import type { Control, FieldValues, Path } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import type { Option } from '@/interfaces/otherTypes';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'; // Assuming shadcn/ui Form components
import { ClosetitemInput } from '@/components/ui/closetitem-input'; // Your custom input

interface ClosetitemCheckboxGroupProps<
  TFieldValues extends FieldValues = FieldValues
> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  description?: string;
  placeholder?: string;
  items: Option[];
  // Add any other props you want to pass to your CustomInput
}

export default function ClosetitemCheckboxGroup<
  TFieldValues extends FieldValues = FieldValues
>({
  control,
  name,
  label,

  items,
}: ClosetitemCheckboxGroupProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <div className="">
            <FormLabel>Seasons</FormLabel>
          </div>
          <div className="flex flex-row justify-between items-center">
            {items.map((item) => (
              <FormField
                key={item.id}
                control={control}
                name={name}
                render={({ field }) => {
                  return (
                    <div className="flex flex-col items-center justify-center gap-1 ">
                      <FormLabel className="text-sm font-normal">
                        {item.label}
                      </FormLabel>
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-center gap-2"
                      >
                        <FormControl className="text-xs md:text-sm text-muted-foreground">
                          <Checkbox
                            className="text-xs md:text-sm text-muted-foreground"
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value: string) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    </div>
                  );
                }}
              />
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
