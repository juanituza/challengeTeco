import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import BounceLoader from "react-spinners/BounceLoader";
import "./ruta.css";


/**
 * Componente RutaPrivada
 * 
 * Este componente actúa como un "guardia de ruta".
 * Verifica si el usuario está autenticado antes de permitir el acceso a una ruta privada.
 * 
 * - Si el estado de autenticación aún no fue determinado, muestra un loader.
 * - Si el usuario está autenticado, renderiza el contenido (children).
 * - Si no está autenticado, redirige al login.
 */

export default function RutaPrivada({ children }) {
  // Obtenemos el estado de autenticación desde el contexto
  const { isAuthenticated } = useAuth();
  // Mientras se verifica la autenticación (valor null), mostramos un loader de carga
  if (isAuthenticated === null) {
    return <div className="loading fixed-top d-flex align-items-center">
      <BounceLoader color="#001494" size={50} speedMultiplier={1.5} margin={2} />
    </div>;
  }
  // Si está autenticado, mostramos los hijos (la ruta privada)
  // Si no lo está, redirigimos automáticamente al login
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
