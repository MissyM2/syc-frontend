import type { Option } from '@/interfaces/types.tsx';

export const categoryItems: Option[] = [
  { value: 'tops', label: 'Tops' },
  { value: 'bottoms', label: 'Bottoms' },
  { value: 'footwear', label: 'Footwear' },
  { value: 'outerwear', label: 'Outerwear' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'jewelry', label: 'Jewelry' },
];
export const seasonItems: Option[] = [
  { value: 'Winter', label: 'Winter' },
  { value: 'Spring', label: 'Spring' },
  { value: 'Summer', label: 'Summer' },
  { value: 'Fall', label: 'Fall' },
  { value: 'All Seasons', label: 'All Seasons' },
];

export const sizeItems: Option[] = [
  { value: 'S', label: 'S' },
  { value: 'M', label: 'M' },
  { value: 'L', label: 'L' },
  { value: 'One Size', label: 'One Size' },
  { value: '2', label: '2' },
  { value: '4', label: '4' },
  { value: '6', label: '6' },
  { value: '8', label: '8' },
  { value: '10', label: '10' },
];

export const colorItems: Option[] = [
  { value: 'red', label: 'Red' },
  { value: 'green', label: 'Green' },
  { value: 'blue', label: 'Blue' },
  { value: 'black', label: 'Black' },
  { value: 'white', label: 'White' },
];

export const occasionItems: Option[] = [
  { value: 'casual', label: 'Casual' },
  { value: 'business', label: 'Business' },
  { value: 'party', label: 'Party' },
  { value: 'wedding', label: 'Wedding' },
  { value: 'vacation', label: 'Vacation' },
  { value: 'everyday', label: 'Everyday' },
  { value: 'workout', label: 'Workout' },
  { value: 'formal', label: 'Formal' },
  { value: 'athletic', label: 'Athletic' },
  { value: 'loungewear', label: 'Loungewear' },
  { value: 'sleepwear', label: 'Sleepwear' },
];

export const closetType: Option[] = [
  { value: 'personal', label: 'All My Items' },
  { value: 'personalOnly', label: 'Personal Only' },
  { value: 'donation', label: 'For Donation' },
  { value: 'sharing', label: 'For Sharing' },
];
