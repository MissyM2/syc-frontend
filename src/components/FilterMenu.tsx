import type { FilterMenuProps } from '../interfaces/Interfaces';
import { FiSearch } from 'react-icons/fi';
import { Checkbox, Collapse } from 'antd';
//import { CheckboxGroup } from './CheckboxGroup.tsx';
import type { ChangeEvent } from 'react';
import { categoryItems, seasonItems } from './Datas.ts';
import React, { useState } from 'react';
import type { FilterObject } from '../interfaces/Interfaces';

const { Panel } = Collapse;

interface FilterMenuProps {
  filters: FilterObject;
  setFilters: (data: any) => void;
  categories: string[];
  seasons: string[];
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
  seasons,
  onCheckboxChange,
}) => {
  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setFilters({
      ...filters,
      searchTerm: e.target.value,
    });
  };

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
        <div className="flex flex-row justify-between">
          <div className="">
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 w-47 border-2  border-gray-300 hover:border-transparent rounded-lg">
              Filter
            </button>
            <div>
              <Collapse defaultActiveKey={['0']}>
                <Panel header="Categories" key="1">
                  {categoryItems.map((option) => (
                    <label key={option}>
                      <input
                        id={option}
                        type="checkbox"
                        value={option}
                        checked={categories.includes(option)}
                        onChange={(e) =>
                          onCheckboxChange(
                            'categories',
                            option,
                            e.target.checked
                          )
                        }
                      />
                      {option}
                    </label>
                  ))}
                </Panel>
              </Collapse>
            </div>
            {/* <CheckboxGroup
              options={categoryItems}
              onSelectionChange={handleFilterChange}
            /> */}

            <div>
              <Collapse defaultActiveKey={['0']}>
                <Panel header="Seasons" key="1">
                  {seasonItems.map((option) => (
                    <label key={option}>
                      <input
                        id={option}
                        type="checkbox"
                        value={option}
                        checked={seasons.includes(option)}
                        onChange={(e) =>
                          onCheckboxChange('seasons', option, e.target.checked)
                        }
                      />
                      {option}
                    </label>
                  ))}
                </Panel>
              </Collapse>
            </div>
          </div>
          <div>
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 w-47 border-2  border-gray-300 hover:border-transparent rounded-lg">
              Sort
            </button>
            <div>Asc A to Z</div>
            <div>Dsc Z to A</div>
          </div>
        </div>
      </div>
    </div>
  );
};
