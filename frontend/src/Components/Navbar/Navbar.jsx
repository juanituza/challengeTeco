import React from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext.jsx";
import "./NavBar.css";


// Componente Navbar: Encargado de mostrar la navegación y cerrar sesión
const Navbar = () => {
    // Hook de React Router para redireccionar
    const navegar = useNavigate();
    // Obtenemos el estado de autenticación y datos del usuario desde el contexto
    const { setIsAuthenticated, user } = useAuth(); 

    /**
   * Función que se ejecuta cuando el usuario hace clic en "Cerrar sesión".
   * - Realiza una solicitud POST al backend para cerrar sesión.
   * - Si tiene éxito, actualiza el estado local de autenticación.
   * - Muestra una notificación con SweetAlert y redirige al login.
   */
    const cerrarSesion = async () => {
        try {
            // Solicitud al endpoint de logout (elimina la cookie/token)
            const response = await fetch("http://localhost:8080/api/sesiones/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                // Incluye cookies para que el backend pueda invalidar la sesión
                credentials: "include",
            });

            const responseData = await response.json();
            // Si el backend responde con éxito:
            if (responseData.status === "success") {
                // Actualiza el estado global para marcar que el usuario ya no está autenticado
                setIsAuthenticated(false);
                // Muestra una alerta de cierre de sesión exitoso
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
            // Si ocurre un error en la solicitud, lo muestra por consola
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <div className="row">
            <header id="header" className="fixed-top d-flex align-items-center">
                <div className="container-fluid container-xl d-flex align-items-center justify-content-lg-between">
                    <Link to="/home" className="col-1">
                        <img src="/telecom_argentina_logo.jpeg" alt="Logo" className="logo" />
                    </Link>

                    <nav id="navbar" className="navbar order-last order-lg-0">
                        <ul>
                            <li>
                                <NavLink
                                    to="/home"
                                    className={({ isActive }) =>
                                        "nav-link scrollto" + (isActive ? " active" : "")
                                    }
                                >
                                    Inicio
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/pokedex"
                                    className={({ isActive }) =>
                                        "nav-link scrollto" + (isActive ? " active" : "")
                                    }
                                >
                                    Pokédex
                                </NavLink>
                            </li>

                            {/* ✅ Mostrar solo si el usuario es ADMIN */}
                            {user?.rol === "ADMIN" ||   user?.rol === "editor" &&(
                                <li>
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
                    </nav>

                    <NavLink onClick={cerrarSesion} className="btn btn-light">
                        Cerrar sesión
                    </NavLink>
                </div>
            </header>
        </div>
    );
};

export default Navbar;
