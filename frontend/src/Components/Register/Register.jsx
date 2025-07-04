import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CiUser, CiMail } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";

import './Login.css';

function Register() {
    // Creamos una referencia para acceder al formulario directamente desde el DOM
    const formRef = useRef(null);

    // Hook de React Router para redireccionar después del registro
    const navigate = useNavigate();
    /**
   * Función que maneja el envío del formulario de registro
   * 
   * - Evita el comportamiento por defecto del formulario.
   * - Obtiene los datos ingresados por el usuario.
   * - Realiza una solicitud POST al backend para registrar un nuevo usuario.
   * - Muestra alertas según el resultado (éxito o error).
   */

    const handleSubmit = async (event) => {
        // Evita que el formulario recargue la página
        event.preventDefault();
        // Obtenemos los datos del formulario a través del ref
        const data = new FormData(formRef.current);
        const obj = {};
        // Convertimos los datos del formulario en un objeto plano { key: value }
        data.forEach((value, key) => (obj[key] = value));

        try {
            const response = await fetch("http://localhost:8080/api/sesiones/register", {
                method: "POST",
                // Enviamos los datos como JSON
                body: JSON.stringify(obj),
                // Indicamos que el contenido es JSON
                headers: {
                    "Content-Type": "application/json",
                },
            });
            // Parseamos la respuesta como JSON
            const responseData = await response.json();
            // Si el registro fue exitoso, mostramos un mensaje de éxito y redirigimos al login
            if (responseData.status === "success") {
                Swal.fire({
                    title: "Registro exitoso",
                    text: "Serás redirigido al inicio de sesión.",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate("/login"); // Redirige al login si se confirma la alerta
                    }
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: responseData.error || "El registro falló",
                });
            }
        } catch (error) {
            // Si ocurre un error en la conexión con el servidor
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error al conectarse al servidor.",
            });
            console.error("Error:", error);
        }
    };

    return (
        <section className="vh-100 m-5 ">
            <div className="container-fluid h-custom card contenedorLogin">
                <div className="row align-items-center bg-light py-3 contenedorLogin ">
                    <div className="col-lg-4 m-3">
                        <Link to="/" className="text-decoration-none">
                            <span className="h1 text-uppercase text-primary  px-2 titleChallenge">Challenge</span>
                            <span className="h1 text-uppercase   px-2 ml-n1 titleTeco">TECO</span>
                        </Link>
                    </div>

                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="/register.png" className="img-fluid" alt="Sample" />
                        </div>

                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form id="registerForm" ref={formRef} onSubmit={handleSubmit}>
                                <div className="form-outline mb-4">
                                    <label className="form-label label-icon"><CiUser className="m-1" />Nombre:</label>

                                    <input
                                        type="text"
                                        name="nombre"
                                        className="input-underline"
                                        required
                                    />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label label-icon"> <CiMail className="m-1" /> Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="input-underline"
                                        required
                                    />
                                </div>
                                <div className="form-outline mb-3">
                                    <label className="form-label label-icon" htmlFor="form3Example4"> <RiLockPasswordLine className="m-1" /> Contraseña</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="input-underline"
                                        required
                                    />

                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button
                                        type="submit"
                                        className="btn btn-primary boton btn-lg"
                                        style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                                    >
                                        Registrarme
                                    </button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">
                                        Ya tienes cuenta?
                                        <Link to="/login" className="link-danger mx-2">Login</Link>
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

export default Register;
