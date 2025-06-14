interface NavLinkType {
  name: string;
  path: string;
  cname: string;
}

export const navAdminLinks: NavLinkType[] = [
  {
    name: 'Profile',
    path: '/profile',
    cname:
      'text-slate-50 border-t border-white font-medium w-full flex justify-center p-2.5 md:border-none md:p-0 md:w-auto',
  },
  {
    name: 'User Admin',
    path: '/user-admin',
    cname:
      'text-slate-50 border-t border-white font-medium w-full flex justify-center p-2.5 md:border-none md:p-0 md:w-auto',
  },
  {
    name: 'Logout',
    path: '/logout',
    cname:
      'text-rose-500 border-t border-white font-medium w-full flex justify-center p-2.5 md:border-none md:p-0 md:w-auto',
  },
];

export const navLinks: NavLinkType[] = [
  {
    name: 'Home',
    path: '/home',
    cname:
      'text-slate-50 border-t border-white font-medium w-full flex justify-center p-2.5 mt-3 md:border-none md:p-0 md:mt-0 md:w-auto ',
  },
  {
    name: 'Create Closet Item',
    path: '/create-closet-item',
    cname:
      'text-slate-50 border-t border-white font-medium w-full flex justify-center p-2.5 md:border-none md:p-0 md:w-auto',
  },
  {
    name: 'About Us',
    path: '/about',
    cname:
      'text-slate-50 border-t border-white font-medium w-full flex justify-center p-2.5 md:border-none md:p-0 md:w-auto',
  },
  {
    name: 'Contact',
    path: '/contact',
    cname:
      'text-slate-50 border-t border-white border-b font-medium w-full flex justify-center p-2.5 md:border-none md:p-0 md:w-auto',
  },
];
