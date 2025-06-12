import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as Checkbox from '@radix-ui/react-checkbox';

interface MyCheckboxGroupProps {
  name: string;
  options: { value: string; label: string }[];
}

const MyCheckboxGroup: React.FC<MyCheckboxGroupProps> = ({ name, options }) => {
  const { control } = useForm();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field: { onChange, value } }) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {options.map((option) => (
            <label
              key={option.value}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '8px',
              }}
            >
              <Checkbox.Root
                checked={value.includes(option.value)}
                onCheckedChange={(checked) => {
                  const updatedValue = checked
                    ? [...value, option.value]
                    : value.filter((v) => v !== option.value);
                  onChange(updatedValue);
                }}
              >
                <Checkbox.Indicator>✓</Checkbox.Indicator>
              </Checkbox.Root>
              <span style={{ marginLeft: '8px' }}>{option.label}</span>
            </label>
          ))}
        </div>
      )}
    />
  );
};

export default MyCheckboxGroup;
