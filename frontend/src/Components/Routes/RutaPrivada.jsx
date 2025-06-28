import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function RutaPrivada({ children }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    return <div>Cargando...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
