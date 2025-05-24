import React, { useState, type ChangeEvent } from 'react';
import { Checkbox, Collapse } from 'antd';

const { Panel } = Collapse;

export const CheckBox: React.FC = () => {
  const [checkedValues, setCheckedValues] = useState<number[]>([]);

  const handleToggle = (itemId: number) => {
    if (checkedValues.includes(itemId)) {
      // If already checked, remove it from the array
      setCheckedValues(checkedValues.filter((id) => id != itemId));
    } else {
      // If not checked, add it to the array
      setCheckedValues([...checkedValues, itemId]);
    }
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
