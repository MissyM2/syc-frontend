// src/routes/loaders.ts
import { redirect } from 'react-router-dom';
import { getUserRole } from '../utils/authUtils.ts';
import type { UserRole } from '../interfaces/types.ts';

export const protectedLoader = (requiredRoles: UserRole[]) => async () => {
  const userRole = getUserRole();

  if (!userRole) {
    return redirect('/login'); // Redirect to login if not authenticated
  }

  if (!requiredRoles.includes(userRole)) {
    return redirect('/unauthorized'); // Redirect if not authorized
  }

  // Optionally, fetch user-specific data or perform other checks
  // const userData = await axiosInstance.get('/api/user/profile');
  // return { user: userData.data };

  return null; // Allow access
};
