interface NavLinkType {
  name: string;
  path: string;
  cname: string;
}

export const navAdminLinks: NavLinkType[] = [
  {
    name: 'About Us',
    path: '/about',
    cname:
      'flex md:hidden bg-gray-200 border-t border-white font-medium w-full flex justify-center p-2.5 md:border-none md:p-0 md:w-auto',
  },
  {
    name: 'Contact',
    path: '/contact',
    cname:
      'flex md:hidden bg-gray-200 border-t border-white font-medium w-full flex justify-center p-2.5 md:border-none md:p-0 md:w-auto',
  },
  // {
  //   name: 'Profile',
  //   path: '/profile',
  //   cname:
  //     'bg-gray-200 border-t border-white font-medium w-full flex justify-center p-2.5 md:border-none md:p-0 md:w-auto',
  // },
  {
    name: 'Admin-Users',
    path: '/admin-users',
    cname:
      'bg-gray-200 border-t border-white font-medium w-full flex justify-center p-2.5 md:border-none md:p-0 md:w-auto',
  },
  {
    name: 'Admin-Closet',
    path: '/admin-closet',
    cname:
      'bg-gray-200 border-t border-white font-medium w-full flex justify-center p-2.5 md:border-none md:p-0 md:w-auto',
  },
];

export const navLinks: NavLinkType[] = [
  {
    name: 'About Us',
    path: '/about',
    cname:
      'hidden md:flex bg-gray-200 border-t border-white font-medium w-full flex justify-center p-2.5 md:border-none md:p-0 md:w-auto',
  },
  {
    name: 'Contact',
    path: '/contact',
    cname:
      'hidden md:flex bg-gray-200 border-t border-white border-b font-medium w-full flex justify-center p-2.5 md:border-none md:p-0 md:w-auto',
  },
];
