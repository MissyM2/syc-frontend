import type { FilterMenuProps } from '../interfaces/Interfaces';
import { FiSearch } from 'react-icons/fi';
import { Button } from '../components/MainButton.tsx';
import { CheckBox } from '../components/CheckBox.tsx';
import type { ChangeEvent } from 'react';

export const FilterMenu: React.FC<FilterMenuProps> = ({
  filters,
  setFilters,
}) => {
  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setFilters({
      ...filters,
      searchTerm: e.target.value,
    });
  };

  const handleFilters = (filters, category) => {
    const newFilters = { ...filters };

    newFilters[category] = filters;

    console.log(newFilters);

    //showFilteredResults(newFilters);
    setFilters(newFilters);
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
            <CheckBox handleFilters={() => handleInput} />

            <div>Season</div>
          </div>
          <div>
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 w-47 border-2  border-gray-300 hover:border-transparent rounded-lg">
              Sort
            </button>
            <div>Asc A to Z</div>
            <div>Dsc Z to A</div>
          </div>

          {/* <div className="flex justify-center mt-2">
            {categoryItems.map((category, idx) => (
              <div className="mr-2">
                <Button
                  variant="primary"
                  size="small"
                  // onClick={() => handleFilterButtonClick(category)}
                  onClick={() => handleFilterButtonClick(category)}
                  key={`filters-${idx}`}
                >
                  ?{category}
                </Button>
              </div>
            ))}
          </div> */}
        </div>
        {/* <div className="rl-row">
           <CheckBox handleFilters={filters => handleFilters(filters, "categoryItems")/>
        </div> */}
      </div>
    </div>
  );
};

{
  /* <CheckBox handleFilters={filters => handleFilters(filters, "categoryItems")/> */
}
