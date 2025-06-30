import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./PanelEdicion.css";

import { CiTrash } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { IoMdPersonAdd } from "react-icons/io";
import Swal from "sweetalert2";

const PanelEdicion = () => {
    const [usuarios, setUsuarios] = useState([]);


   useEffect(() => {
    fetch("http://localhost:8080/api/usuarios/obtener-usuarios", {
        method: "GET",
        credentials: "include", // importante para enviar cookies
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.status === "success") {
                setUsuarios(data.payload);
                // ✅ Eliminamos el Swal y navigate
            } else {
                console.error("Error de autenticación o permisos:", data.error);
            }
        })
        .catch((error) => console.error("Error al obtener usuarios:", error));
}, []);




    const eliminarUsuario = async (usuarioId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/usuarios/${usuarioId}`, {
                method: "DELETE",
                credentials: "include",
            });
            setUsuarios(usuarios.filter((u) => u.id !== usuarioId));

            const responseData = await response.json();
            if (responseData.status === "success") {
                Swal.fire({
                    title: "Usuario eliminado con éxito",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate("/PanelEdicion"); // redirección usando React Router
                    }
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: responseData.error || "Registro fallido",
                });
            }

        } catch (err) {
            console.error("Error al eliminar usuario:", err);
        }
    };

    return (
        <div className="panel-edicion-container">
            <h2>Panel de Edición de Usuarios</h2>
            <div className="d-flex justify-content-center mt-4">
                <NavLink to="/crear-usuario" className="btn btn-success">
                    <IoMdPersonAdd /> Crear Usuario
                </NavLink>
            </div>
            <div className="table-wrapper">

                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Editar</th>
                            <th>Eliminar</th>

                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>{usuario.id}</td>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.rol}</td>
                                <td>

                                    <NavLink
                                        to={`/editar-usuario/${usuario.id}`}
                                        className="btn btn-outline-secondary"
                                    >
                                        <CiEdit /> Editar
                                    </NavLink>
                                </td>
                                <td>
                                    <button
                                        to={`/${usuario.id}`}
                                        className="btn btn-outline-danger"
                                        onClick={() => eliminarUsuario(usuario.id)}
                                    >
                                        <CiTrash /> Eliminar
                                    </button>
                                </td>
                                <td>
                                    {/* Podés agregar aquí un botón para crear usuarios */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            <div className="d-flex justify-content-center mt-4">
                <NavLink to="/home" className="btn btn-primary">
                    Inicio
                </NavLink>
            </div>
        </div>
    );

};

export default PanelEdicion;
