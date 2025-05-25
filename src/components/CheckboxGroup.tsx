import React, { useState, type ChangeEvent } from 'react';
import { Checkbox, Collapse } from 'antd';

const { Panel } = Collapse;

interface CheckboxGroupProps {
  paneltitle: string;
  propertyname: string;
  options: string[];
  onSelectionChange: (selectedOptions: string[]) => void;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  paneltitle,
  propertyname,
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

  // const renderCheckboxLists = () =>
  //   options.map((option) => (
  //     <label key={option}>
  //       <input type="checkbox" value={option} onChange={handleCheckboxChange} />
  //       {option}
  //     </label>
  //   ));

  return (
    <div>
      <Collapse defaultActiveKey={['0']}>
        <Panel header={paneltitle} key="1">
          {options.map((option) => (
            <label key={option}>
              <input
                id={option}
                type="checkbox"
                value={option}
                checked={(propertyname as any).includes(option)}
                onChange={(e) =>
                  onCheckboxChange(`${propertyname}`, option, e.target.checked)
                }
              />
              {option}
            </label>
          ))}
        </Panel>
      </Collapse>
    </div>
  );
};
