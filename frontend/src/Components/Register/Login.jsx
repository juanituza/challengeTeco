import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
import "aos/dist/aos.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { CiMail } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import "./Login.css";


function Login() {
    // Estado local para manejar los valores del formulario
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // Obtenemos funciones del contexto de autenticación
    const { setUser, setIsAuthenticated } = useAuth();

    /**
   * Función que maneja el envío del formulario de login.
   * - Evita el comportamiento por defecto del formulario.
   * - Envía una solicitud al backend con email y contraseña.
   * - Si el login es exitoso:
   *   - Se guarda el usuario y el estado de autenticación.
   *   - Se muestra una notificación y se redirige a /home.
   * - Si falla, se muestra una alerta de error.
   */



    const handleSubmit = async (e) => {
        // Previene recarga de la página
        e.preventDefault();

        try {
            // Enviamos los datos de login al backend
            const response = await fetch('http://localhost:8080/api/sesiones/login', {
                method: 'POST',
                headers: {
                    
                    'Content-Type': 'application/json',
                },
                // Enviamos los datos como JSON
                body: JSON.stringify({ email, password }),
                // Importante: permite enviar cookies (sesión)
                credentials: 'include'
            });
            // Parseamos la respuesta del servidor
            const responseData = await response.json();
           
            // Si el login fue exitoso
            if (responseData.status === "success") {
                // Indicamos que el usuario está autenticado
                setIsAuthenticated(true);
                // Guardamos el usuario recibido
                setUser(responseData.payload);

                // Mostramos un mensaje de éxito con redirección automática
                Swal.fire({
                    title:'Ingreso exitoso',
                    text: 'Serás redirigido a la página de inicio.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                    timerProgressBar: true,
                }).then(() => {
                    // Redirigimos manualmente (podés usar `navegar("/home")` también)
                    window.location.href = "/home"
                    
                });


            } else {
                // Si el servidor devuelve error (credenciales incorrectas, etc.)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: responseData.error || "Error de inicio de sesion",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Hubo un error de conexión con el servidor.",
            });
            console.error("Error:", error);
        }
    };

    return (
        <section className="vh-100 m-5">
            <div className="container-fluid h-custom card cardLogin">
                <div className="row align-items-center bg-light py-3 contenedorLogin">
                    <div className="col-lg-4 m-2">
                        <span className="h1 text-uppercase text-primary px-2 titleChallenge">Challenge</span>
                        <span className="h1 text-uppercase px-2 ml-n1 titleTeco">TECO</span>
                    </div>

                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5 my-4">
                            <img src="/login.png" className="img-fluid" alt="Login" />
                        </div>

                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form onSubmit={handleSubmit}>
                                <div className="input-group">
                                    <label className="form-label label-icon">
                                        <CiMail /> Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="input-underline"
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <label className="form-label label-icon">
                                        <RiLockPasswordLine /> Contraseña
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="input-underline"
                                        required
                                    />
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="submit" className="btn btn-primary boton btn-lg" style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>
                                        Ingresar
                                    </button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">
                                        No tienes cuenta?
                                        <Link to="/register" className="link-danger mx-2">Registrarme</Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
