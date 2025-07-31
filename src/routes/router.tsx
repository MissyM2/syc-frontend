import { Navigate, createBrowserRouter } from 'react-router-dom';

import ProfilePage from '../pages/ProfilePage';
import Dashboard from '../pages/Dashboard';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import AdminDashboardPage from '../pages/AdminDashboardPage.tsx';
import AddClosetitemPage from '../pages/AddClosetitemPage.tsx';
import ProtectedRoute from '../routing/ProtectedRoutes.tsx';
import RootLayout from '../components/RootLayout';
import UnauthorizedPage from '../pages/UnauthorizedPage.tsx';
import { protectedLoader } from './loaders';
import { UserRole } from '../interfaces/types';

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
            element: <Dashboard />,
          },
          {
            path: '/addclosetitem',
            element: <AddClosetitemPage />,
          },
          {
            path: '/admin-dashboard',
            element: <AdminDashboardPage />,
            // loader: protectedLoader([UserRole.Admin]),
            // errorElement: <UnauthorizedPage />, // Optional: A component to render on loader errors
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
