import React from 'react';
interface CheckboxGroupProps {
  selectedFilterName: string;
  selectedFilter: string[];
  options: string[];
  onCheckboxChange: (
    filterName: string,
    value: string,
    isChecked: boolean
  ) => void;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  selectedFilterName,
  selectedFilter,
  options,

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
              checked={selectedFilter.includes(option)}
              onChange={(e) =>
                onCheckboxChange(selectedFilterName, option, e.target.checked)
              }
            />
            <span className="text-gray-600 ms-2">{option}</span>
          </label>
        </div>
      ))}
    </div>
  );
};
