import { useState, useEffect } from 'react';
import axios from 'axios';
import { FilterMenu } from '../features/closetitems/components/FilterMenu.tsx';
import { OutputList } from '../features/closetitem/components/OutputList.tsx';
import type { Closetitem } from '../features/closetitem/closetitemInterfaces';
////import type { TClosetitemList } from '../features/closetitem/closetitemInterfaces';
import {
  //getAllClosetitems,
  getClosetitemsByUserId,
} from '../features/closetitem/closetitemActions.ts';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';

import { useNavigate } from 'react-router-dom';

import { FaPlus } from 'react-icons/fa6';
import RoundButton from '../features/closetitem/components/RoundButton.tsx';
import { json } from 'stream/consumers';

//const URL = 'http://localhost:3000';

interface FilterObject {
  searchTerm: string;
  categories: string[];
  seasons: string[];
  sizes: string[];
  sort: string;
}

const Dashboard: React.FC = () => {
  const [closetitems, setClosetitems] = useState<Closetitem[]>([]);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [filteredClosetitems, setFilteredClosetitems] = useState<Closetitem[]>(
    []
  );

  const [presignedUrls, setPresignedUrls] = useState<{ [key: string]: string }>(
    {}
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<FilterObject>({
    searchTerm: '',
    categories: [],
    seasons: [],
    sizes: [],
    sort: 'asc',
  });

  const navigate = useNavigate();

  // const handleCheckboxChange = useCallback(
  //   (filterName: string, value: string, isChecked: boolean) => {
  //     if (filterName === 'categories') {
  //       setFilters((prevFilter) => {
  //         const updatedValues = isChecked
  //           ? [...prevFilter.categories, value]
  //           : prevFilter.categories.filter(
  //               (closetitem) => closetitem !== value
  //             );
  //         return { ...prevFilter, categories: updatedValues };
  //       });
  //     } else if (filterName === 'seasons') {
  //       setFilters((prevFilter) => {
  //         const updatedValues = isChecked
  //           ? [...prevFilter.seasons, value]
  //           : prevFilter.seasons.filter((closetitem) => closetitem !== value);
  //         return { ...prevFilter, seasons: updatedValues };
  //       });
  //     } else if (filterName === 'sizes') {
  //       setFilters((prevFilter) => {
  //         const updatedValues = isChecked
  //           ? [...prevFilter.sizes, value]
  //           : prevFilter.sizes.filter((closetitem) => closetitem !== value);
  //         return { ...prevFilter, sizes: updatedValues };
  //       });
  //     }
  //   },
  //   []
  // );

  const sortAndFilterClosetitems = (filterObj: FilterObject) => {
    //console.log(filterObj.searchTerm);
    //console.log(filterObj.category);
    return closetitems.filter((closetitem) => {
      return (
        // filter by search term - check if closetitem.name includes the current search term
        closetitem.itemName &&
        closetitem.itemName
          .toLowerCase()
          .indexOf(filterObj.searchTerm.toLowerCase()) > -1 &&
        //filter by category - check if closetitem.category is part of the options inside the filters.category array
        (filterObj.categories.length > 0
          ? filterObj.categories.includes(closetitem.category)
          : true) &&
        (filterObj.seasons.length > 0
          ? filterObj.seasons.includes(closetitem.season)
          : true) &&
        (filterObj.sizes.length > 0
          ? filterObj.sizes.includes(closetitem.size)
          : true)
      );
      // expand with more checks to fit your data
      //})
      // .sort((a: any, b: any) => {
      //   // first, get the name parameter
      //   const seasonA = a.season.toLowerCase();
      //   const seasonB = b.season.toLowerCase();
      //   if (filterObj.sort === 'desc') {
      //     //return seasonB.localeCompare(seasonA); // returns 1 if nameB > nameA and returns -1 if nameB < nameA
      //   } else if (filterObj.sort === 'asc') {
      //     return seasonA.localeCompare(seasonB); // returns 1 if nameA > nameB and returns -1 if nameA < nameB
      //   }
      return 0;
    });
  };

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
  //   async function getPresignedUrls() {
  //     if (closetitems.length > 0) {
  //       const urls: { [key: string]: any } = {};
  //       for (const item of closetitems) {
  //         // Simulate fetching presigned URL
  //         console.log('closetitem? ' + JSON.stringify(item));
  //         const url = await axios.get(
  //           `http://localhost:3000/api/images/download-url/${item.imageId}`
  //         );
  //         console.log('what is url? ' + JSON.stringify(url));
  //         item.imageUrl = url.data.presignedUrl;
  //         urls[item._id] = url;
  //       }
  //       setPresignedUrls(urls);
  //     }
  //   }
  //   getPresignedUrls();
  // }, [closetitems]); // Rerun when 'items' state changes

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
  //console.log('what is closetitems? ' + JSON.stringify(closetitems));

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

      {/* <FilterMenu
        filters={filters}
        setFilters={setFilters}
        onCheckboxChange={handleCheckboxChange}
      />
      Filters: {JSON.stringify(filters)}*/}
      <OutputList data={filteredClosetitems} />
    </div>
  );
};

export default Dashboard;
