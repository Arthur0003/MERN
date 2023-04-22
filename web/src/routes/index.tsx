import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './Layout';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { UserPage } from '../pages/UserPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'user',
        element: <UserPage />,
      },
    ],
  },
]);
