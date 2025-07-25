import React from 'react';
import { FiSearch } from 'react-icons/fi';
import type { ChangeEvent } from 'react';

interface SearchBoxProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  searchTerm,
  onSearch,
}) => {
  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    onSearch(e.target.value);
  };

  return (
    <div className="w-full bg-red-50">
      <div className="flex flex-col bg-orange-50">
        <div className="w-full bg-green-50">
          <form className="flex items-center border-2 border-gray-300 rounded-lg px-4 py-2 w-full mb-2">
            <fieldset className="flex flex-row outline-none w-full">
              <input
                value={searchTerm}
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
      </div>
    </div>
  );
};
