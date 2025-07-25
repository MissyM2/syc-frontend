import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as Checkbox from '@radix-ui/react-checkbox';

interface CheckboxOption {
  value: string;
  label: string;
}

interface FormData {
  options: string[];
}

export const CheckboxGroup = ({ options }: { options: CheckboxOption[] }) => {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      options: [],
    },
  });

  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {options.map((option) => (
        <div key={option.value}>
          <Controller
            name="options"
            control={control}
            render={({ field }) => (
              <label>
                <input
                  type="checkbox"
                  value={option.value}
                  checked={field.value?.includes(option.value)}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    if (isChecked) {
                      field.onChange([...(field.value || []), option.value]);
                    } else {
                      field.onChange(
                        field.value?.filter((val) => val !== option.value)
                      );
                    }
                  }}
                />
                {option.label}
              </label>
            )}
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

//export default CheckboxGroup;
