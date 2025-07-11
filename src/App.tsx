import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

//import ProfilePage from './pages/ProfilePage';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './routing/ProtectedRoute';
import RootLayout from './components/RootLayout';
// import { AboutPage } from './pages/AboutPage';
// import { ContactUsPage } from './pages/ContactUsPage.tsx';

// import { UserAdminPage } from './pages/UserAdminPage.tsx';

import { AddClosetitemPage } from './pages/AddClosetitemPage.tsx';
// import { ViewClosetitemDetailPage } from './features/closetitem/view-closetitem-detail.tsx';
// import { NotFoundPage } from './pages/NotFoundPage';

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
    element: <ProtectedRoute />,
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
