import { createBrowserRouter } from 'react-router';

import { LoginPage } from '../pages/LoginPage';
import { LoginUserPage } from '../components/auth/LoginUserPage';
import { RegisterPage } from '../components/auth/RegisterPage';
import Home from '../pages/Home';


export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login-usuario',
    element: <LoginUserPage />,
  },
  {
    path: '/registro',
    element: <RegisterPage />,
  },
]);