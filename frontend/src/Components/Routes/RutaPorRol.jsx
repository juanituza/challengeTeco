import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import BounceLoader from "react-spinners/BounceLoader";

export default function RutaPorRol({ children, rolesPermitidos = [] }) {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated === null) {
    return (
      <div className="loading fixed-top d-flex align-items-center justify-content-center">
        <BounceLoader color="#001494" size={50} speedMultiplier={1.5} />
      </div>
    );
  }

  const rol = user?.rol?.toUpperCase?.(); // asegúrate que esté en mayúscula
  const tienePermiso = isAuthenticated && rolesPermitidos.includes(rol);

  if (!tienePermiso) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
