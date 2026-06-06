import { Suspense , lazy, type JSX } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from '../lib/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LazyLoginPage = lazy(() => import('../pages/LoginPage'));
const LazyHomePage = lazy(() => import('../pages/HomePage'));
const LazyLoginUserPage = lazy(() => import('../components/auth/LoginUserPage'));
const LazyRegisterPage = lazy(() => import('../components/auth/RegisterPage'));
const LazyUBSProfilePage = lazy(() => import('../pages/UBSProfilePage'));
const LazyAdminPage = lazy(() => import('../pages/AdminPainelPage'));


function PrivateRoutes({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  if (isAuthenticated === null) {
    return <div>Verificando sessão...</div>;
  }

  if (isAuthenticated === false) {
    navigate("/login-usuario");
  }

  return children;
}


export function AppRoutes() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Routes>
        <Route path="/login" element={<LazyLoginPage />} />
        <Route path="/login-usuario" element={<LazyLoginUserPage />} />
        <Route path="/registro" element={<LazyRegisterPage />} />
        <Route path="/" element={<LazyHomePage />} />
        <Route path="/ubs/:id" element={
          <PrivateRoutes>
            <LazyUBSProfilePage />
          </PrivateRoutes>
          } />
        <Route path="/admin" element={
          <PrivateRoutes>
            <LazyAdminPage />
          </PrivateRoutes>
        } />
      </Routes>
    </Suspense>
  );
}


//{
  //   path: '/login',
  //   element: <LoginPage />,
  // },
  // {
  //   path: '/',
  //   element: <HomePage />,
  // },
  // {
  //   path: '/login-usuario',
  //   element: <LoginUserPage />,
  // },
  // {
  //   path: '/registro',
  //   element: <RegisterPage />,
  // },
  // {
  //   path: '/ubs/:id',
  //   element: <UBSProfilePage />,
  // },
  // {
  //   path: '/admin',
  //   element: <AdminPage />,
  // }