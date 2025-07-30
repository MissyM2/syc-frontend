import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  redirect,
} from 'react-router-dom';

//import ProfilePage from './pages/ProfilePage';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminClosetPage from './pages/AdminClosetPage';
import ProtectedRoute from './routing/ProtectedRoute.tsx';
import RootLayout from './components/RootLayout';
import { ErrorPage } from './pages/ErrorPage.tsx';
import { useSelector } from 'react-redux';
import store from './app/store';
// import { AboutPage } from './pages/AboutPage';
// import { ContactUsPage } from './pages/ContactUsPage.tsx';

// import { UserAdminPage } from './pages/UserAdminPage.tsx';

import { AddClosetitemPage } from './pages/AddClosetitemPage.tsx';
// import { ViewClosetitemDetailPage } from './features/closet/view-closetitem-detail.tsx';
// import { NotFoundPage } from './pages/NotFoundPage';

export const checkAdminRole = ({params, store}: LoaderArgs => {
  const state = store.getState();
  const userRole = state.user.currentUser?.role; // Assuming 'auth' slice and 'user' object with 'role'
  if (userRole !== 'admin') {
    throw redirect('/unauthorized'); // Redirect to an unauthorized page
  }
  return null; // Allow navigation if role is correct
};

const router = createBrowserRouter([
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
            path: '/admin-users',
            element: <AdminUsersPage />,
            loader: ({ params }) => checkAdminRole(params, store),
            errorElement: <ErrorPage />, // Optional: A component to render on loader errors
          },
          {
            path: '/admin-closet',
            element: <AdminClosetPage />,
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

function App() {
  return <RouterProvider router={router} />;
}

export default App;
