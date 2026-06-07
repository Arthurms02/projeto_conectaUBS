import { AuthProvider, useAuth } from './lib/context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/routes'



function AppComponent() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    return <div>Verificando sessão...</div>;
  }

  return(
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AuthProvider>
        <AppComponent />

    </AuthProvider>
  );
}