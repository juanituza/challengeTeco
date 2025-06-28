import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function RutaInvitado({ children }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    // Mientras verificamos el estado de auth
    return <div>Cargando...</div>;
  }

  // Si está autenticado, redirigimos a /home
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  // Si no está autenticado, renderizamos el contenido (login, register)
  return children;
}
