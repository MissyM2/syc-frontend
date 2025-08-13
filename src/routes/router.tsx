import { Navigate, createBrowserRouter } from 'react-router-dom';
import store from '../app/store.ts';

import ProfilePage from '../pages/ProfilePage.tsx';
import DashboardPage from '../pages/DashboardPage.tsx';
import LoginPage from '../pages/LoginPage.tsx';
import RegisterPage from '../pages/RegisterPage.tsx';
import ManageUsersPage from '../pages/ManageUsersPage.tsx';
import AddClosetitemPage from '../pages/AddClosetitemPage.tsx';
import ProtectedRoute from '../routing/ProtectedRoutes.tsx';
import RootLayout from '../components/RootLayout';
import UnauthorizedPage from '../pages/UnauthorizedPage.tsx';
import { protectedLoader } from './loaders';
import { UserRole } from '../interfaces/otherTypes.ts';

// const adminLoader = () => {
//   const { user } = store.getState(); // Access Redux state directly
//   if (user.userRole !== 'admin') {
//     throw new Response('Unauthorized', { status: 403 }); // Or redirect to UnauthorizedPage
//   }
//   return null; // Continue with the route
// };

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    element: <ProtectedRoute allowedRoles={['admin', 'user']} />,
    children: [
      {
        element: <RootLayout />,
        children: [
          {
            path: '/dashboard',
            element: <DashboardPage />,
            // loader: protectedLoader([UserRole.Admin, UserRole.User]),
            // errorElement: <UnauthorizedPage />,
          },
          {
            path: '/addclosetitem',
            element: <AddClosetitemPage />,
          },
          {
            path: '/manage-users',
            element: <ManageUsersPage />,
            loader: protectedLoader([UserRole.Admin]),
            errorElement: <UnauthorizedPage />, // Optional: A component to render on loader errors
          },
          {
            path: '/user-profile',
            element: <ProfilePage />,
            loader: protectedLoader([UserRole.Admin, UserRole.User]), // Admin and User access
          },
          {
            path: '/unauthorized',
            element: <UnauthorizedPage />,
          },
          {
            path: '*', // Catch-all route for any path not matched above
            element: <Navigate to="/" replace />, // Redirect to home page
          },
        ],
      },
    ],
  },
]);
//           {
//             path: '/user-profile',
//             element: <ProfilePage />,
//           },
//         ],
//       },

//       {
//         path: '*', // Catch-all route for any path not matched above
//         element: <Navigate to="/" replace />, // Redirect to home page
//       },
//     ],
//   },
// ]);
