import { createBrowserRouter } from 'react-router';

import { LoginPage } from '../pages/LoginPage';
import { LoginUserPage } from '../components/auth/LoginUserPage';
import { RegisterPage } from '../components/auth/RegisterPage';
import { HomePage } from '../pages/HomePage';
import { UBSProfilePage } from '../pages/UBSProfilePage';
import { AdminPage } from '../pages/AdminPainelPage';


export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login-usuario',
    element: <LoginUserPage />,
  },
  {
    path: '/registro',
    element: <RegisterPage />,
  },
  {
    path: '/ubs/:id',
    element: <UBSProfilePage />,
  },
  {
    path: '/admin',
    element: <AdminPage />,
  }
]);