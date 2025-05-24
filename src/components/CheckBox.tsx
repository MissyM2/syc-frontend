import React, { useState, type ChangeEvent } from 'react';
import { Checkbox, Collapse } from 'antd';
import { categoryItems } from './Datas.ts';
import type { CheckBoxProps } from '../interfaces/Interfaces.tsx';

const { Panel } = Collapse;

export const CheckBox: React.FC<CheckBoxProps> = ({ handleFilters }) => {
  const [checkedValues, setCheckedValues] = useState<number[]>([]);

  const handleToggle = (itemId: number) => {
    const currentIndex = checkedValues.indexOf(itemId);
    const newChecked = [...checkedValues];

    if (currentIndex === -1) {
      newChecked.push(itemId);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedValues(newChecked);
    console.log('inside handleToggle: after setCheckedValues' + checkedValues);
    handleFilters(newChecked);
    //update this checked information into Parent Component
  };

  const renderCheckboxLists = () =>
    categoryItems.map((item) => (
      <div key={item._id}>
        <label>
          <Checkbox
            type="checkbox"
            // checked={Checked.indexOf(value._id) === -1 ? false : true}
            checked={checkedValues.includes(item._id)}
            onChange={() => handleToggle(item._id)}
          />
        </label>
        &nbsp;&nbsp;
        <span>{item.name}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
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
