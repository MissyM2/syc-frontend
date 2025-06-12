import React from 'react';

interface RadioButtonProps {
  label: string;
  value: string;
  name: string;
  onChange: (value: string) => void;
  checked: boolean;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  name,
  onChange,
  checked,
}) => {
  return (
    <label>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
      />
      {label}
    </label>
  );
};

export default RadioButton;
