import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { Collapse, ConfigProvider, theme } from 'antd';
import type { CollapseProps } from 'antd';
import { CheckboxGroup } from './CheckboxGroup.tsx';
import type { ChangeEvent } from 'react';
import { categoryItems, seasonItems, sizeItems } from './Datas.ts';

import type { FilterObject } from '../interfaces/Interfaces';
import type { CSSProperties } from 'react';

const { Panel } = Collapse;

interface FilterMenuProps {
  filters: FilterObject;
  setFilters: (data: any) => void;
  onCheckboxChange: (
    filterName: string,
    value: string,
    isChecked: boolean
  ) => void;
}

export const FilterMenu: React.FC<FilterMenuProps> = ({
  filters,
  setFilters,
  onCheckboxChange,
}) => {
  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setFilters({
      ...filters,
      searchTerm: e.target.value,
    });
  };

  const { token } = theme.useToken();

  const filterItemsNest: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Categories',
      children: (
        <CheckboxGroup
          selectedFilterName="categories"
          selectedFilter={filters.categories}
          options={categoryItems}
          onCheckboxChange={onCheckboxChange}
        />
      ),
    },
    {
      key: '2',
      label: 'Seasons',
      children: (
        <CheckboxGroup
          selectedFilterName="seasons"
          selectedFilter={filters.seasons}
          options={seasonItems}
          onCheckboxChange={onCheckboxChange}
        />
      ),
    },
    {
      key: '3',
      label: 'Sizes',
      children: (
        <CheckboxGroup
          selectedFilterName="sizes"
          selectedFilter={filters.sizes}
          options={sizeItems}
          onCheckboxChange={onCheckboxChange}
        />
      ),
    },
  ];

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    borderRadius: token.borderRadiusLG,
    border: '2px solid #cbd5e0',
  };

  const getFilterItems: (
    panelStyle: CSSProperties
  ) => CollapseProps['items'] = (panelStyle) => [
    {
      key: '1',
      label: 'Filters',
      children: <Collapse defaultActiveKey="1" items={filterItemsNest} />,
      showArrow: false,
      style: panelStyle,
    },
  ];

  // const getSortItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (
  //   panelStyle
  // ) => [
  //   {
  //     key: '1',
  //     label: 'Sort',
  //     children: <Collapse defaultActiveKey="1" items={sortItemsNest} />,
  //     showArrow: false,
  //     style: panelStyle,
  //   },
  // ];

  return (
    <div className="w-full bg-red-50">
      <div className="flex flex-col bg-orange-50">
        <div className="w-full bg-green-50">
          <form className="flex items-center border-2 border-gray-300 rounded-lg px-4 py-2 w-full mb-2">
            <fieldset className="flex flex-row outline-none w-full">
              <input
                onChange={handleInput}
                className="w-full"
                placeholder="Search Closet Items..."
              ></input>
              <button className="filtermenu__search-button">
                <FiSearch className="h-5 w- text-gray-400" />
              </button>
            </fieldset>
          </form>
        </div>
        <div className="flex flex-row">
          <div className="w-1/2 me-3">
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
                bordered={false}
                items={getFilterItems(panelStyle)}
              />
            </ConfigProvider>
          </div>

          <div className="w-1/2 ms-3">
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
                defaultActiveKey={['0']}
                size="large"
                bordered={false}
                style={panelStyle}
              >
                <Panel key={'1'} header="Sort" showArrow={false}>
                  <div>
                    <div>Name - A to Z</div>
                    <div>Name - Z to A</div>
                  </div>
                </Panel>
              </Collapse>
            </ConfigProvider>
          </div>
        </div>
      </div>
    </div>
  );
};
