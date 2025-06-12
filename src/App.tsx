import { RouterProvider, createBrowserRouter } from 'react-router-dom';

//import Header from './components/HeaderPage.tsx';
import { AboutPage } from './pages/AboutPage';
import { ContactUsPage } from './pages/ContactUsPage.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { LandingPage } from './pages/LandingPage.tsx';
//import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage.tsx';
//import { RegisterPage } from './pages/RegisterPage';
import { CreateClosetitemPage } from './features/closetitems/create-closetitem.tsx';
import { ViewClosetitemDetailPage } from './features/closetitems/view-closetitem-detail.tsx';
import { NotFoundPage } from './pages/NotFoundPage';

import { RootLayout } from './components/RootLayout';
//import UserRegistrationPage from './features/users/user-reg.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/home',
        element: <HomePage />,
      },
      // {
      //   path: '/register',
      //   element: <RegisterPage />,
      // },
      // {
      //   path: '/login',
      //   element: <LoginPage />,
      // },
      {
        path: '/profile',
        element: <ProfilePage />,
      },

      {
        path: '/create-closet-item',
        element: <CreateClosetitemPage />,
      },

      {
        path: '/view-closetitem-detail/:id',
        element: <ViewClosetitemDetailPage />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '/contact',
        element: <ContactUsPage />,
      },

      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

function App() {
  // return <UserRegistrationPage />;
  return <RouterProvider router={router} />;
}

export default App;
