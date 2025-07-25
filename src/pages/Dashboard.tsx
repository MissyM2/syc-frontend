import { useState, useEffect, useCallback, useMemo } from 'react';
import { SearchBox } from '../features/closet/components/SearchBox.tsx';
import { CollapsibleOptionGroup } from '../features/closet/components/CollapsibleOptionGroup.tsx';
//import { CheckboxGroup } from '../features/closet/components/CheckboxGroup.tsx';
import { OutputList } from '../features/closet/components/OutputList.tsx';

import { fetchClosetitems } from '../features/closet/closetActions.ts';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';

import { useNavigate } from 'react-router-dom';

import { FaPlus } from 'react-icons/fa6';
import RoundButton from '../features/closet/components/RoundButton.tsx';

// interface FilterObject {
//   searchTerm: string;
// }

const Dashboard: React.FC = () => {
  //const [closetitems, setClosetitems] = useState<Closetitem[]>([]);
  //const [searchTerm, setSearchTerm] = useState<string>('');
  const userId = useSelector((state: RootState) => state.user.userInfo?._id);
  const closetitems = useSelector(
    (state: RootState) => state.closet.closetitems
  );

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log('Dashboard: inside useEffect.');
    if (userId) {
      dispatch(fetchClosetitems(userId));
    }
  }, [dispatch, userId]);

  const handleAddClosetitem = () => {
    navigate('/addclosetitem');
  };

  return (
    <div className="w-full">
      <div>Number of items from store: {closetitems.length}</div>
      <div className="flex justify-end p-4">
        <RoundButton onClick={handleAddClosetitem}>
          <FaPlus className="h-10 w-10" />
        </RoundButton>
      </div>

      <OutputList data={closetitems} />
    </div>
  );
};

export default Dashboard;
