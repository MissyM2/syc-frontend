import { useState, useEffect, useCallback } from 'react';
import { SearchBox } from '../features/closetitem/components/SearchBox.tsx';
import { CollapsibleOptionGroup } from '../features/closetitem/components/CollapsibleOptionGroup.tsx';
//import { CheckboxGroup } from '../features/closetitem/components/CheckboxGroup.tsx';
import { OutputList } from '../features/closetitem/components/OutputList.tsx';
import type { Closetitem } from '../features/closetitem/closetitemInterfaces';
import { getClosetitemsByUserId } from '../features/closetitem/closetitemActions.ts';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';
import {
  categoryItems,
  seasonItems,
  sizeItems,
} from '../features/closetitem/Closetitem-datas.ts';
import { useNavigate } from 'react-router-dom';

import { FaPlus } from 'react-icons/fa6';
import RoundButton from '../features/closetitem/components/RoundButton.tsx';

interface FilterObject {
  searchTerm: string;
}

const Dashboard: React.FC = () => {
  const [closetitems, setClosetitems] = useState<Closetitem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { userInfo } = useSelector((state: RootState) => state.user);
  const [filteredClosetitems, setFilteredClosetitems] = useState<Closetitem[]>(
    []
  );

  const [filters, setFilters] = useState<FilterObject>({
    searchTerm: '',
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const sortAndFilterClosetitems = (filterObj: FilterObject) => {
    console.log(filterObj.searchTerm);
    //console.log(filterObj.category);
    return closetitems.filter((closetitem) => {
      return (
        // filter by search term - check if closetitem.name includes the current search term
        closetitem.itemName &&
        closetitem.itemName
          .toLowerCase()
          .indexOf(filterObj.searchTerm.toLowerCase()) > -1
      );

      return 0;
    });
  };

  useEffect(() => {
    const loadAllClosetitems = async () => {
      setLoading(true);
      setError(null);
      try {
        let userId: string | undefined;
        if (userInfo) {
          userId = userInfo._id;
        }

        if (!userId) {
          return console.log('User ID not found');
        }
        const resultAction = await dispatch(getClosetitemsByUserId(userId));

        if ('payload' in resultAction && Array.isArray(resultAction.payload)) {
          setClosetitems(resultAction.payload);
        } else {
          setClosetitems([]);
        }
      } catch (e: any) {
        setError('missy' + e.message);
      } finally {
        setLoading(false);
      }
    };

    loadAllClosetitems();
  }, []);

  useEffect(() => {
    const data = sortAndFilterClosetitems(filters);
    setFilteredClosetitems(data);
  }, [filters, closetitems]);

  if (loading) {
    return <p>Loading Closet Items...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleAddClosetitem = () => {
    navigate('/addclosetitem');
  };

  return (
    <div className="w-full">
      <div className="flex justify-end p-4">
        <RoundButton onClick={handleAddClosetitem}>
          <FaPlus className="h-10 w-10" />
        </RoundButton>
      </div>
      <SearchBox searchTerm={searchTerm} onSearch={setSearchTerm} />
      {/* <FilterMenu filters={filters} setFilters={setFilters} />
      Filters: {JSON.stringify(filters)} */}
      <div className="grid grid-cols-4 w-3/4">
        <div className="p-2">
          <CollapsibleOptionGroup label="Category">
            <div className="flex flex-col gap-2">
              {categoryItems.map((option) => (
                <label className="text-sm text-rose-400">
                  <input type="checkbox" name={option.value} /> {option.value}
                </label>
              ))}
            </div>
          </CollapsibleOptionGroup>
        </div>
        <div className="p-2">
          <CollapsibleOptionGroup label="Season" initialCollapsed={true}>
            <div className="flex flex-col gap-2">
              {seasonItems.map((option) => (
                <label className="text-sm text-rose-400">
                  <input type="checkbox" name={option.value} /> {option.value}
                </label>
              ))}
            </div>
          </CollapsibleOptionGroup>
        </div>
        <div className="p-2">
          <CollapsibleOptionGroup label="Size">
            <div className="flex flex-col gap-2">
              {sizeItems.map((option) => (
                <label className="text-sm text-rose-400">
                  <input type="radio" name={option.value} /> {option.value}
                </label>
              ))}
            </div>
          </CollapsibleOptionGroup>
        </div>
        <div className="p-2">
          <CollapsibleOptionGroup label="Rating">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-rose-400">
                <input type="radio" name="rating" /> Rating
              </label>
            </div>
          </CollapsibleOptionGroup>
        </div>
      </div>
      <div className="col-span-1"></div>
      <OutputList data={filteredClosetitems} />
    </div>
  );
};

export default Dashboard;
