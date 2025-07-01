import React from "react";
import "./NoAutorizado.css";
import { Link } from "react-router-dom";

const NoAutorizado = () => {
  return (
    <div className="no-autorizado-container">
      <h1 className="no-autorizado-titulo">🚫 Acceso denegado</h1>
      <p className="no-autorizado-texto">
        No tenés permisos para acceder a esta página.
      </p>
      <Link to="/home" className="no-autorizado-btn">
        Volver al inicio
      </Link>
    </div>
  );
};

export default NoAutorizado;
