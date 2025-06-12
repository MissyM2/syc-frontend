import { useState, useEffect, useCallback } from 'react';
//import axios from 'axios';
import type { Closetitem } from '../interfaces/Interfaces.tsx';
import { FilterMenu } from '../features/closetitems/components/FilterMenu.tsx';
import { OutputList } from '../features/closetitems/components/OutputList.tsx';
import {
  getAllClosetitems,
  //createClosetitem,
  //updateClosetitem,
  //deleteClosetitem,
} from '../features/closetitems/closetitem-api.ts';

import type { FilterObject } from '../interfaces/Interfaces';

//const URL = 'http://localhost:3000';

export type TClosetitemList = Closetitem[];

export const HomePage: React.FC = () => {
  const [closetitems, setClosetitems] = useState<Closetitem[]>([]);
  const [filteredClosetitems, setFilteredClosetitems] = useState<Closetitem[]>(
    []
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

  const handleCheckboxChange = useCallback(
    (filterName: string, value: string, isChecked: boolean) => {
      if (filterName === 'categories') {
        setFilters((prevFilter) => {
          const updatedValues = isChecked
            ? [...prevFilter.categories, value]
            : prevFilter.categories.filter(
                (closetitem) => closetitem !== value
              );
          return { ...prevFilter, categories: updatedValues };
        });
      } else if (filterName === 'seasons') {
        setFilters((prevFilter) => {
          const updatedValues = isChecked
            ? [...prevFilter.seasons, value]
            : prevFilter.seasons.filter((closetitem) => closetitem !== value);
          return { ...prevFilter, seasons: updatedValues };
        });
      } else if (filterName === 'sizes') {
        setFilters((prevFilter) => {
          const updatedValues = isChecked
            ? [...prevFilter.sizes, value]
            : prevFilter.sizes.filter((closetitem) => closetitem !== value);
          return { ...prevFilter, sizes: updatedValues };
        });
      }
    },
    []
  );

  const sortAndFilterClosetitems = (filterObj: FilterObject) => {
    //console.log(filterObj.searchTerm);
    //console.log(filterObj.category);
    return closetitems
      .filter((closetitem) => {
        return (
          // filter by search term - check if closetitem.name includes the current search term
          closetitem.name &&
          closetitem.name
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
      })
      .sort((a: any, b: any) => {
        // first, get the name parameter
        const seasonA = a.season.toLowerCase();
        const seasonB = b.season.toLowerCase();
        if (filterObj.sort === 'desc') {
          //return seasonB.localeCompare(seasonA); // returns 1 if nameB > nameA and returns -1 if nameB < nameA
        } else if (filterObj.sort === 'asc') {
          return seasonA.localeCompare(seasonB); // returns 1 if nameA > nameB and returns -1 if nameA < nameB
        }
        return 0;
      });
  };

  useEffect(() => {
    const loadAllClosetitems = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllClosetitems();
        setClosetitems(data ?? []);
      } catch (e: any) {
        setError(e.message);
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

  return (
    <div className="w-full">
      <FilterMenu
        filters={filters}
        setFilters={setFilters}
        onCheckboxChange={handleCheckboxChange}
      />
      Filters: {JSON.stringify(filters)}
      <OutputList data={filteredClosetitems} />
    </div>
  );
};
