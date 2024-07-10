import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/Auth';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return children;
};

export default ProtectedRoute;
