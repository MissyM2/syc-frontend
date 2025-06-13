//import type { Category, Season, SortOption } from '../types/Types.tsx';

// export interface User {
//   name: string;
//   emailAddress: string;
//   password: string;
//   dateCreated: Date;
//   //closetitems: [];
// }
export interface User {
  _id: number;
  name: string;
  emailAddress: string;
  password?: string;
  dateCreated: Date;
}

export interface LoginUser {
  emailAddress: string;
  password: string;
  dateLogin: Date;
  //closetitems: [];
}

interface ImageData {
  data: string;
}
export interface Closetitem {
  _id: string;
  category: string;
  name: string;
  season: string;
  size: string;
  desc: string;
  rating: string;
  dateCreated: Date;
  imageFile: ImageData;
  imageId?: string;
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
