import React, { useState, type ChangeEvent } from 'react';
import { Checkbox, Collapse } from 'antd';

const { Panel } = Collapse;

interface CheckboxGroupProps {
  options: string[];
  onSelectionChange: (selectedOptions: string[]) => void;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  onSelectionChange,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    }
    onSelectionChange(selectedOptions);
  };

  const renderCheckboxLists = () =>
    options.map((option) => (
      <label key={option}>
        <input type="checkbox" value={option} onChange={handleCheckboxChange} />
        {option}
      </label>
    ));

  return (
    <div>
      <Collapse defaultActiveKey={['0']}>
        <Panel header="Categories" key="1">
          {renderCheckboxLists()}
        </Panel>
      </Collapse>
    </div>
  );
};
