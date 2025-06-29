import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import BounceLoader from "react-spinners/BounceLoader";
import "./ruta.css"; 

export default function RutaInvitado({ children }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    // Mientras verificamos el estado de auth
    return <div className="loading fixed-top d-flex align-items-center">
          <BounceLoader color="#001494" size={50} speedMultiplier={1.5} margin={2} />
        </div>;
  }

  // Si está autenticado, redirigimos a /home
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  // Si no está autenticado, renderizamos el contenido (login, register)
  return children;
}
