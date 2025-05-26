//import type { FilterMenuProps } from '../interfaces/Interfaces';
import { FiSearch } from 'react-icons/fi';
import { Checkbox, Collapse, ConfigProvider, theme, Divider } from 'antd';
import type { CollapseProps } from 'antd';
import { CheckboxGroup } from './CheckboxGroup.tsx';
import type { ChangeEvent } from 'react';
import { categoryItems, seasonItems, sizeItems } from './Datas.ts';
import React, { useState } from 'react';
import type { FilterObject } from '../interfaces/Interfaces';
import type { CSSProperties } from 'react';

const { Panel } = Collapse;

interface FilterMenuProps {
  filters: FilterObject;
  setFilters: (data: any) => void;
  categories: string[];
  // seasons: string[];
  // sizes: string[];
  onCheckboxChange: (
    filterName: string,
    value: string,
    isChecked: boolean
  ) => void;
}

export const FilterMenu: React.FC<FilterMenuProps> = ({
  filters,
  setFilters,
  categories,
  // seasons,
  // sizes,
  onCheckboxChange,
}) => {
  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setFilters({
      ...filters,
      searchTerm: e.target.value,
    });
  };

  const { token } = theme.useToken();

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const itemsNest: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Categories',
      children: (
        <CheckboxGroup
          categories={filters.categories}
          options={categoryItems}
          onCheckboxChange={onCheckboxChange}
        />
        // <div className="ms-4">
        //   {categoryItems.map((option) => (
        //     <div>
        //       <label htmlFor={option} key={option}>
        //         <input
        //           id={option}
        //           type="checkbox"
        //           value={option}
        //           checked={categories.includes(option)}
        //           onChange={(e) =>
        //             onCheckboxChange(propertyName, option, e.target.checked)
        //           }
        //         />
        //         <span className="text-gray-600 ms-2">{option}</span>
        //       </label>
        //     </div>
        //   ))}
        // </div>
      ),
    },
    // {
    //   key: '2',
    //   label: 'Seasons',
    //   children: (
    //     <div>
    //       {seasonItems.map((option) => (
    //         <div className="ms-4">
    //           <label key={option}>
    //             <input
    //               id={option}
    //               type="checkbox"
    //               value={option}
    //               checked={seasons.includes(option)}
    //               onChange={(e) =>
    //                 onCheckboxChange('seasons', option, e.target.checked)
    //               }
    //             />
    //             <span className="text-gray-600 ms-2">{option}</span>
    //           </label>
    //         </div>
    //       ))}
    //     </div>
    //   ),
    // },
    // {
    //   key: '3',
    //   label: 'Sizes',
    //   children: (
    //     <div>
    //       {sizeItems.map((option) => (
    //         <div className="ms-4">
    //           <label key={option}>
    //             <input
    //               id={option}
    //               type="checkbox"
    //               value={option}
    //               checked={sizes.includes(option)}
    //               onChange={(e) =>
    //                 onCheckboxChange('sizes', option, e.target.checked)
    //               }
    //             />
    //             <span className="text-gray-600 ms-2">{option}</span>
    //           </label>
    //         </div>
    //       ))}
    //     </div>
    //   ),
    // },
  ];

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    borderRadius: token.borderRadiusLG,
    border: '2px solid #cbd5e0',
  };

  const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (
    panelStyle
  ) => [
    {
      key: '1',
      label: 'Filters',
      children: <Collapse defaultActiveKey="1" items={itemsNest} />,
      showArrow: false,
      style: panelStyle,
    },
  ];

  return (
    <div className="flex flex-column">
      <div className="">
        <form className="flex items-center border-2 border-gray-300 rounded-lg px-4 py-2 w-96 mb-2">
          <fieldset className="flex flex-row outline-none w-full">
            <input
              onChange={handleInput}
              className="w-85"
              placeholder="Search Closet Items..."
            ></input>
            <button className="filtermenu__search-button">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </button>
          </fieldset>
        </form>
        <div>
          <ConfigProvider
            theme={{
              token: {},
              components: {
                Collapse: {
                  borderlessContentPadding: 0,
                  colorBorder: 'none',
                  headerBg: 'none',
                },
              },
            }}
          >
            <Collapse
              size="large"
              onChange={onChange}
              bordered={false}
              items={getItems(panelStyle)}
            />
          </ConfigProvider>

          {/* <div>
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 w-47 border-2  border-gray-300 hover:border-transparent rounded-lg">
              Sort
            </button>
            <div>Asc A to Z</div>
            <div>Dsc Z to A</div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
