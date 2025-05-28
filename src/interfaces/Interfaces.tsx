//import type { Category, Season, SortOption } from '../types/Types.tsx';

export interface Closetitem {
  _id: string;
  category: string;
  name: string;
  season: string;
  size: string;
  desc: string;
  rating: string;
}

export interface ClosetitemCardProp {
  closetitem: Closetitem;
}

// export interface FilterMenuProps {
//   filters: FilterObject;
//   setFilters: (data: any) => void;
// }

export interface FilterObject {
  searchTerm: string;
  categories: string[];
  seasons: string[];
  sizes: string[];
  sort: string;
}

export interface Option {
  value: string;
  label: string;
}
