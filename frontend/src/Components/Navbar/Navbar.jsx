import React from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext.jsx";
import "./NavBar.css"; // Asegurate que no sobreescriba mal las clases

const Navbar = () => {
  const navegar = useNavigate();
  const { setIsAuthenticated, user } = useAuth();

  const cerrarSesion = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/sesiones/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const responseData = await response.json();

      if (responseData.status === "success") {
        setIsAuthenticated(false);
        Swal.fire({
          title: "Has cerrado sesión exitosamente",
          text: "Esperamos que nos visites pronto.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          timerProgressBar: true,
          didClose: () => {
            navegar("/login");
          },
        });
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark fixed-top shadow header">

      <div className="container-fluid" id="header">
        {/* Logo */}
        <Link to="/home" className="navbar-brand d-flex align-items-center">
          <span className="text-light">Telecom</span>
        </Link>

        {/* Botón hamburguesa */}
        <div className="hamburguesa">

        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon icono"></span>
        </button>
</div>
        {/* Contenido del navbar */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                   "nav-link scrollto" + (isActive ? " active" : "")
                }
              >
                Inicio
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/pokedex"
                className={({ isActive }) =>
                  "nav-link scrollto" + (isActive ? " active" : "")
                }
              >
                Pokédex
              </NavLink>
            </li>

            {["ADMIN", "EDITOR"].includes(user?.rol?.toUpperCase()) && (
              <li className="nav-item">
                <NavLink
                  to="/panel-admin"
                  className={({ isActive }) =>
                     "nav-link scrollto" + (isActive ? " active" : "")
                  }
                >
                  Administrar usuarios
                </NavLink>
              </li>
            )}
          </ul>

          <button onClick={cerrarSesion} className="btn btn-danger">
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
