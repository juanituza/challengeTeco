import React from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext.jsx";
import "./NavBar.css";

const Navbar = () => {
    const navegar = useNavigate();
    const { setIsAuthenticated, user } = useAuth(); // 🔍 Accedemos al usuario

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
                            {user?.rol === "ADMIN" && (
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
