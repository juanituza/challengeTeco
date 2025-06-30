import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./PanelEdicion.css";

import { CiTrash } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { IoMdPersonAdd } from "react-icons/io";
import Swal from "sweetalert2";

// Componente principal para administrar (ver y eliminar) usuarios
const PanelEdicion = () => {
    // Estado local para almacenar la lista de usuarios
    const [usuarios, setUsuarios] = useState([]);

    // useEffect que se ejecuta una vez al montar el componente
   useEffect(() => {
    // Realiza una petición GET al backend para obtener todos los usuarios
    fetch("http://localhost:8080/api/usuarios/obtener-usuarios", {
        method: "GET",
        // incluye cookies para mantener la sesión
        credentials: "include", 
    })
        // transforma la respuesta a JSON
        .then((res) => res.json())
        .then((data) => {
            // Si la respuesta es exitosa, actualiza el estado con los usuarios
            if (data.status === "success") {
                setUsuarios(data.payload);
                
            } else {
                // Si hay un error de permisos o autenticación, lo muestra en consola
                console.error("Error de autenticación o permisos:", data.error);
            }
        })
        // Captura errores de red
        .catch((error) => console.error("Error al obtener usuarios:", error));
}, []);

    /**
   * Función que elimina un usuario por su ID.
   * - Realiza una petición DELETE al backend.
   * - Si es exitosa, actualiza el estado local eliminando el usuario.
   * - Muestra una alerta con SweetAlert confirmando la acción.
   */
    const eliminarUsuario = async (usuarioId) => {
        try {
            // Envia una solicitud DELETE al backend para eliminar el usuario
            const response = await fetch(`http://localhost:8080/api/usuarios/${usuarioId}`, {
                method: "DELETE",
                // se envía la cookie de sesión
                credentials: "include",
            });
            // Actualiza el estado local filtrando el usuario eliminado
            setUsuarios(usuarios.filter((u) => u.id !== usuarioId));
            // Parsea la respuesta del backend
            const responseData = await response.json();
            if (responseData.status === "success") {
                // Muestra mensaje de éxito con SweetAlert
                Swal.fire({
                    title: "Usuario eliminado con éxito",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Redirecciona nuevamente al panel
                        navigate("/PanelEdicion"); 
                    }
                });
            } else {
                // Si hubo un error, se muestra con SweetAlert
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: responseData.error || "Elminacion fallida",
                });
            }

        } catch (err) {
            // En caso de error, lo mostramos en consola
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
