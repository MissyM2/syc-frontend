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
import { urlToHttpOptions } from 'url';

const Dashboard: React.FC = () => {
  const [closetitems, setClosetitems] = useState<Closetitem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [filteredClosetitems, setFilteredClosetitems] = useState<Closetitem[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const loadAllClosetitems = async () => {
      setLoading(true);
      setError(null);
      try {
        const userId = userInfo._id.toString();
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

  // useEffect(() => {
  //   const data = sortAndFilterClosetitems(filters);
  //   setFilteredClosetitems(data);
  // }, [filters, closetitems]);

  if (loading) {
    return <p>Loading Closet Items...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleClick = () => {
    alert('Round button clicked!');
    navigate('/addclosetitem');
  };

  return (
    <div className="w-full">
      <div className="flex justify-end">
        <RoundButton onClick={handleClick}>
          <FaPlus className="h-10 w-10" />
        </RoundButton>
      </div>
      <SearchBox searchTerm={searchTerm} onSearch={setSearchTerm} />
      {/* <FilterMenu filters={filters} setFilters={setFilters} />
      Filters: {JSON.stringify(filters)} */}
      <div className="flex flex-row gap-2 bg-red-200 p-4">
        <div className="bg-blue-200">
          <CollapsibleOptionGroup label="Category">
            <div className="flex flex-col gap-2 bg-red-200">
              {categoryItems.map((option) => (
                <label>
                  <input type="checkbox" name={option.value} /> {option.value}
                </label>
              ))}
            </div>
          </CollapsibleOptionGroup>
        </div>
        <div className="bg-green-200">
          <CollapsibleOptionGroup label="Season" initialCollapsed={true}>
            <div className="flex flex-col gap-2 bg-red-200">
              {seasonItems.map((option) => (
                <label>
                  <input type="checkbox" name={option.value} /> {option.value}
                </label>
              ))}
            </div>
          </CollapsibleOptionGroup>
        </div>
        <div className="bg-orange-200">
          <CollapsibleOptionGroup label="Size">
            <div className="flex flex-col gap-2 bg-red-200">
              {sizeItems.map((option) => (
                <label>
                  <input type="radio" name={option.value} /> {option.value}
                </label>
              ))}
            </div>
          </CollapsibleOptionGroup>
        </div>
      </div>
      <OutputList data={filteredClosetitems} />
    </div>
  );
};

export default Dashboard;
