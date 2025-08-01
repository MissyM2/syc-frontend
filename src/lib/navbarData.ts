import type { User } from '../interfaces/userInterfaces.ts';

interface NavLinkType {
  label: string;
  path: string;
  requiredRoles?: Array<User['userRole']>;
  cname: string;
}

export const hamburgerLinks: NavLinkType[] = [
  {
    label: 'About Us',
    path: '/about',
    requiredRoles: ['user'],
    cname:
      'flex md:hidden bg-gray-200 border-t border-white font-medium w-full flex justify-center p-2.5 md:border-none md:p-0 md:w-auto',
  },
  {
    label: 'Contact',
    path: '/contact',
    requiredRoles: ['user'],
    cname:
      'flex md:hidden bg-gray-200 border-t border-white font-medium w-full flex justify-center p-2.5 md:border-none md:p-0 md:w-auto',
  },
  {
    label: 'Profile',
    path: '/user-profile',
    requiredRoles: ['user'],
    cname:
      'bg-gray-200 border-t border-white font-medium w-full flex justify-center p-2.5 md:border-none md:p-0 md:w-auto',
  },
  {
    label: 'Manage Users',
    path: '/manage-users',
    requiredRoles: ['admin'],
    cname:
      'bg-gray-200 border-t border-white font-medium w-full flex justify-center p-2.5 md:border-none md:p-0 md:w-auto',
  },
];

export const navLinks: NavLinkType[] = [
  {
    label: 'About Us',
    path: '/about',
    requiredRoles: ['user'],
    cname:
      'hidden md:flex bg-gray-200 border-t border-white font-medium w-full flex justify-center p-2.5 md:border-none md:p-0 md:w-auto',
  },
  {
    label: 'Contact',
    path: '/contact',
    requiredRoles: ['user'],
    cname:
      'hidden md:flex bg-gray-200 border-t border-white border-b font-medium w-full flex justify-center p-2.5 md:border-none md:p-0 md:w-auto',
  },
];
