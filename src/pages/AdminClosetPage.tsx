//import { CheckboxGroup } from '../features/closet/components/CheckboxGroup.tsx';
import { OutputListUsers } from '../components/OutputListUsers.tsx';

import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store.ts';

import { useNavigate } from 'react-router-dom';

import { FaPlus } from 'react-icons/fa6';
import RoundButton from '../features/closet/components/RoundButton.tsx';

// interface FilterObject {
//   searchTerm: string;
// }

const AdminClosetPage: React.FC = () => {
  const closetitems = useSelector(
    (state: RootState) => state.closet.closetitems
  );

  const navigate = useNavigate();

  return (
    <div className="w-full">
      <div>
        Users are fetched from Atlas. Number of users: {closetitems.length}
      </div>

      <div className="flex justify-end p-4">
        {/* <RoundButton onClick={handleAddClosetitem}>
          <FaPlus className="h-10 w-10" />
        </RoundButton> */}
      </div>

      <OutputListUsers data={closetitems} />
    </div>
  );
};

export default AdminClosetPage;
