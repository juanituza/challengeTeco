import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CiUser, CiMail } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { ROLES } from "../../../../shared/roles.js";

import "./EditarUsuario.css";

const EditarUsuario = () => {
    const { id } = useParams(); // Capturar el ID desde la URL
    const formRef = useRef(null);
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/api/usuarios/${id}`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === "success") {
                    setUsuario(data.payload);
                } else {
                    Swal.fire("Error", "No se pudo cargar el usuario", "error");
                }
            })
            .catch((err) => console.error("Error al obtener usuario:", err));
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(formRef.current);

        const obj = {};
        data.forEach((value, key) => (obj[key] = value));

        try {
            const response = await fetch(`http://localhost:8080/api/usuarios/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(obj),
            });

            const result = await response.json();



            if (result.status === "success") {
                Swal.fire("Actualizado", "Usuario actualizado correctamente", "success").then(() =>
                    navigate("/panel-admin")
                );
            } else {
                Swal.fire("Error", result.error || "Error al actualizar", "error");
            }
        } catch (err) {
            console.error("Error al actualizar usuario:", err);
            Swal.fire("Error", "Error de red o servidor", "error");
        }
    };

    if (!usuario) return <p className="text-center">Cargando usuario...</p>;

    return (
        <section className="vh-100 m-5">
            <div className="container-fluid h-custom contenedoPrimario">
                <h2 className="title">Editar Usuario</h2>
            </div>

            <div className="container-fluid h-custom card">
                <div className="row align-items-center bg-light py-3 contenedorLogin">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form ref={formRef} onSubmit={handleSubmit}>
                                <div className="form-outline mb-4">
                                    <label className="form-label label-icon">
                                        <CiUser className="m-1" />Nombre:
                                    </label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        defaultValue={usuario.nombre}
                                        className="input-underline"
                                        required
                                    />
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label label-icon">
                                        <CiMail className="m-1" /> Email:
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        defaultValue={usuario.email}
                                        className="input-underline"
                                        required
                                    />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label label-icon">
                                        <CiUser className="m-1" />Rol:
                                    </label>
                                    <select
                                        name="rol"
                                        defaultValue={usuario.rol}
                                        className="input-underline"
                                        required
                                    >
                                        <option value="" className="input-underline">Seleccionar rol</option>
                                        {Object.entries(ROLES).map(([key, value]) => (
                                            <option key={key} value={value} className="input-underline">
                                                {value.charAt(0).toUpperCase() + value.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-outline mb-3">
                                    <label className="form-label label-icon">
                                        <RiLockPasswordLine className="m-1" /> Nueva contraseña:
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="input-underline"
                                        placeholder="(opcional)"
                                    />
                                </div>

                                <div className="text-center  mt-4 pt-2">
                                    <button type="submit" className="btn btn-primary boton-crear-usuario">
                                        Actualizar Usuario
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EditarUsuario;
