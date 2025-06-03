export type Season = 'Winter' | 'Spring' | 'Summer' | 'Fall';

export type Size = 'S' | 'M' | 'L' | 'N/A';

export type Category =
  | 'Clothing'
  | 'Footwear'
  | 'Outerwear'
  | 'Sportswear'
  | 'Accessories';

export type SortOption = 'asc' | 'desc';

export type MyErrorType = {
  status: string;
  message: string;
  type: string;
  errors: string[];
};
