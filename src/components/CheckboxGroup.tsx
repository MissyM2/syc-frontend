import React from 'react';
interface CheckboxGroupProps {
  options: string[];
  categories: string[];
  onCheckboxChange: (
    filterName: string,
    value: string,
    isChecked: boolean
  ) => void;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  categories,
  onCheckboxChange,
}) => {
  return (
    <div className="ms-4">
      {options.map((option) => (
        <div>
          <label htmlFor={option} key={option}>
            <input
              id={option}
              type="checkbox"
              value={option}
              checked={categories.includes(option)}
              onChange={(e) =>
                onCheckboxChange('categories', option, e.target.checked)
              }
            />
            <span className="text-gray-600 ms-2">{option}</span>
          </label>
        </div>
      ))}
    </div>
  );
};
