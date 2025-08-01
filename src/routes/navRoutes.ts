import { BiHomeAlt2 } from 'react-icons/bi';
import { FiSearch } from 'react-icons/fi';
import { PiChatCircleBold } from 'react-icons/pi';
import { IoPricetagsOutline } from 'react-icons/io5';

export const navRoutes = [
  {
    title: 'Home',
    path: '#',
    requiredRoles: ['user', 'admin'],
    onClickFunction: null,
    Icon: BiHomeAlt2,
  },
  {
    title: 'About Us',
    path: 'about',
    requiredRoles: ['user'],
    onClickFunction: null,
    Icon: FiSearch,
  },
  {
    title: 'Contact',
    path: '/contact',
    requiredRoles: ['user'],
    onClickFunction: null,
    Icon: IoPricetagsOutline,
  },
  {
    title: 'Profile',
    path: 'user-profile',
    requiredRoles: ['user', 'admin'],
    onClickFunction: null,
    Icon: PiChatCircleBold,
  },
  {
    title: 'Manage Users',
    path: '/manage-users',
    requiredRoles: ['admin'],
    onClickFunction: null,
    Icon: PiChatCircleBold,
  },
];
