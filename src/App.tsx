import { RouterProvider, createBrowserRouter } from 'react-router-dom';

//import Header from './components/HeaderPage.tsx';
import { AboutPage } from './pages/AboutPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { HomePage } from './pages/HomePage';
import { LandingPage } from './pages/LandingPage';
//import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
//import { RegisterPage } from './pages/RegisterPage';
import { ViewItemDetailPage } from './pages/ViewItemDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ClosetItemAddPage } from './features/closetitems/closetitem-test-add';
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
        element: <ClosetItemAddPage />,
      },

      {
        path: '/closet-items/:closetitemId',
        element: <ViewItemDetailPage />,
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
