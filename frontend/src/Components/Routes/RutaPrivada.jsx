import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import BounceLoader from "react-spinners/BounceLoader";
import "./ruta.css";

export default function RutaPrivada({ children }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    return <div className="loading fixed-top d-flex align-items-center">
          <BounceLoader  color="#001494" size={50} speedMultiplier={1.5} margin={2} />
        </div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
