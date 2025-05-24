import type { FilterMenuProps } from '../interfaces/Interfaces';
import { FiSearch } from 'react-icons/fi';

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

  return (
    <div className="filter-menu">
      <div className="rl-container">
        <div className="rl-row">
          <form className="filter-menu__search-form">
            <fieldset className="filter-menu__fieldset">
              <input
                onChange={handleInput}
                className="filter-menu__search-input"
                placeholder="Search Recipts..."></input>
                <button className="filtermenu__search-button">
                  <FiSearch className="filter-menu__search-icon"/>
                </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};
