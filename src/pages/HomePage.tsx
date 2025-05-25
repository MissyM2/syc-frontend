import { useState, useEffect, useCallback } from 'react';
//import { getClosetitems } from '../api-functions';
//import { ClosetitemCard } from '../components/ClosetitemCard.tsx';
import axios from 'axios';
import type { Closetitem } from '../interfaces/Interfaces.tsx';
import { FilterMenu } from '../components/FilterMenu.tsx';
import { OutputList } from '../components/OutputList.tsx';
import type { ChangeEvent } from 'react';

const URL = 'http://localhost:3000';

export type TClosetitemList = Closetitem[];

interface FilterObject {
  searchTerm: string;
  categories: string[];
  seasons: string[];
  // size: Size[];
}

export const HomePage: React.FC = () => {
  const [data, setData] = useState<Closetitem[]>([]);
  const [filteredData, setFilteredData] = useState<Closetitem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<FilterObject>({
    searchTerm: '',
    categories: [],
    seasons: [],
    // size: [],
  });

  const handleCheckboxChange = useCallback(
    (value: string, isChecked: boolean) => {
      setFilters((prevFilter) => {
        const updatedValues = isChecked
          ? [...prevFilter.categories, value]
          : prevFilter.categories.filter((item) => item !== value);
        return { ...prevFilter, categories: updatedValues };
      });
    },
    []
  );

  const sortAndFilterClosetitems = (filterObj: FilterObject) => {
    //console.log(filterObj.searchTerm);
    //console.log(filterObj.category);
    return data.filter((item) => {
      return (
        // filter by search term - check if item.name includes the current search term
        item.name &&
        item.name.toLowerCase().indexOf(filterObj.searchTerm.toLowerCase()) >
          -1 &&
        //filter by category - check if item.category is part of the options inside the filters.category array
        (filterObj.categories.length > 0
          ? filterObj.categories.includes(item.category)
          : true)
      );
      // expand with more checks to fit your data
    });
    // .sort((a: any, b: any) => {
    //   // first, get the name parameter
    //   const seasonA = a.season.toLowerCase();
    //   const seasonB = b.season.toLowerCase();
    //   if (filterObj.sort === 'desc') {
    //     //return seasonB.localeCompare(seasonA); // returns 1 if nameB > nameA and returns -1 if nameB < nameA
    //   } else if (filterObj.sort === 'asc') {
    //     return seasonA.localeCompare(seasonB); // returns 1 if nameA > nameB and returns -1 if nameA < nameB
    //   }
    //   return 0;
    //});
  };

  useEffect(() => {
    const loadAllClosetitems = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<TClosetitemList>(
          `${URL}/syc/closetitems`
        );
        setData(response.data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    loadAllClosetitems();
  }, []);

  useEffect(() => {
    const data = sortAndFilterClosetitems(filters); // call the `sortAndFilterData`function and set its returned value to `filteredData`
    setFilteredData(data);
  }, [filters, data]);

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="home">
      <FilterMenu
        filters={filters}
        setFilters={setFilters}
        categories={filters.categories}
        onCheckboxChange={handleCheckboxChange}
      />
      Filters: {JSON.stringify(filters)}
      <OutputList data={filteredData} />
    </div>
  );
};
