import React from 'react';
import { useController } from 'react-hook-form';
import { RadioButton } from '../../../components/ui/radiobutton';

interface RadioButtonGroupProps {
  name: string;
  options: { label: string; value: string }[];
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  name,
  options,
}) => {
  const { field } = useController({ name, control });

  return (
    <div>
      {options.map((option) => (
        <RadioButton
          key={option.value}
          label={option.label}
          value={option.value}
          name={name}
          onChange={field.onChange}
          checked={field.value === option.value}
        />
      ))}
    </div>
  );
};

export default RadioButtonGroup;
