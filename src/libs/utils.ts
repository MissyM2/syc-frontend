import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn: any = (...inputs: any[]) => {
  return twMerge(clsx(inputs));
};
