import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import BounceLoader from "react-spinners/BounceLoader";


/**
 * Componente RutaPorRol
 * 
 * Este componente protege rutas que solo deben ser accesibles por ciertos roles (por ejemplo: ADMIN, EDITOR).
 * 
 * Props:
 * - children: el contenido a renderizar si tiene acceso
 * - rolesPermitidos: lista de roles válidos que pueden acceder a la ruta
 * 
 * Funcionamiento:
 * - Si la autenticación aún no se resolvió (isAuthenticated es null), muestra un loader.
 * - Si el usuario no tiene un rol permitido, redirige a una página de "no autorizado".
 * - Si todo está OK, renderiza el contenido de la ruta.
 */

export default function RutaPorRol({ children, rolesPermitidos = [] }) {
  // Obtenemos los datos del contexto de autenticación
  const { isAuthenticated, user } = useAuth();
  // Mientras no se haya definido si está autenticado o no, mostramos un loader
  if (isAuthenticated === null) {
    return (
      <div className="loading fixed-top d-flex align-items-center justify-content-center">
        <BounceLoader color="#001494" size={50} speedMultiplier={1.5} />
      </div>
    );
  }
   // Extraemos el rol del usuario y lo convertimos a mayúscula por si acaso
  const rol = user?.rol?.toUpperCase?.();
  // Verificamos si está autenticado y su rol está incluido en los permitidos
  const tienePermiso = isAuthenticated && rolesPermitidos.includes(rol);
   // Si no tiene permiso, redirigimos a la página de acceso denegado
  if (!tienePermiso) {
    return <Navigate to="/unauthorized" replace />;
  }
  // Si todo está correcto, renderizamos los hijos de la ruta
  return children;
}
