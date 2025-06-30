import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import BounceLoader from "react-spinners/BounceLoader";
import "./ruta.css";



/**
 * Componente RutaInvitado
 * 
 * Este componente protege rutas pensadas **solo para usuarios no autenticados**,
 * como el formulario de login o registro.
 * 
 * Funcionamiento:
 * - Si el estado de autenticación aún no se conoce (null), muestra un loader.
 * - Si el usuario ya está autenticado, redirige a `/home`.
 * - Si no está autenticado, renderiza el contenido (por ejemplo: Login o Register).
 */
export default function RutaInvitado({ children }) {
  // Obtenemos el estado de autenticación
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    // Mientras verificamos el estado de auth, mostramos el spinner de carga
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
