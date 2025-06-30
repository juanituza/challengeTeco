import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CiUser, CiMail } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";

import './CrearUsuario.css';

function CrearUsuario () {
    const formRef = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(formRef.current);
        const obj = {};
        data.forEach((value, key) => (obj[key] = value));

        try {
            const response = await fetch("http://localhost:8080/api/sesiones/register", {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const responseData = await response.json();

            if (responseData.status === "success") {
                Swal.fire({
                    title: "Registro realizado con éxito",
                    text: "Será redirigido al panel",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate("/panel-admin"); // redirección usando React Router
                    }
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: responseData.error || "Registro fallido",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error al conectar con el servidor.",
            });
            console.error("Error:", error);
        }
    };

    return (
        <section className="vh-100 m-5 ">
            <div className="container-fluid h-custom contenedoPrimario">
                <h2 className="title">Crear Usuarios</h2>
            </div>
            
            <div className="container-fluid h-custom card ">
                
                <div className="row align-items-center bg-light py-3 contenedorLogin ">
                    

                    <div className="row d-flex justify-content-center align-items-center h-100">


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
                                        className="btn btn-primary boton-crear-usuario"
                                        
                                    >
                                        Crear Usuario
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CrearUsuario ;
