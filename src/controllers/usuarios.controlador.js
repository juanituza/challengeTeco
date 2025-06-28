// import { usersService } from "../dao/Managers/Mongo/index.js";
import { servicioUsuarios } from "../services/repositorios/index.js";
import usersDTO from "../dto/UserDTO.js";
import { documentsExist } from "../constants/userError.js";
import ErrorService from "../services/ErrorServicer.js";
import EErrors from "../constants/EErrors.js";
import LoggerService from "../dao/MySql/Managers/LoggerManager.js";

// Obtener los usuarios
const obtenerUsaruios = async (req, res) => {
  //Obtener los usuarios desde el servicio
  const usuarios = await servicioUsuarios.getUsers();
  //
  const analizadorUsuarios = usuarios.map((usuario) => new usersDTO(usuario));
  
  res.sendSuccessWithPayload(analizadorUsuarios);
};

// Guardar un nuevo usuario
const guardarUsuarios = async (req, res) => {
  try {
    //Capturar los datos del usuario desde el cuerpo de la solicitud
    const { nombre, email, contraseña, role } = req.body;
    //Validar que los campos requeridos no estén vacíos
    if (!nombre || !email || !contraseña)
      return res
        .status(400)
        .send({ status: "error", payload: "Datos Incompletos" });
    //Crear un usuario con los datos capturados
    const resultado = await servicioUsuarios.createUser(usuario);
    res.sendSuccessWithPayload({ resultado });
  } catch (error) {
    res.sendInternalError("Internal error");
  }
};

//Editar usuario
const editarUsuario = async (req, res) => {
  try {
    //Capturar el ID del usuario desde los parámetros de la solicitud
    const usuarioId = req.params.uid;
    //Capturar los datos del usuario desde el cuerpo de la solicitud
    const usuarioEditado = req.body.role;
    //Editar el usuario
    await servicioUsuarios.updateUser(
      { _id: usuarioId },
      { role: usuarioEditado }
    );
  
    // res.sendSuccessWithPayload({ result });
    res.sendSuccess("Usuario actualizado correctamente");
  } catch (error) {
    res.sendInternalError("Error interno, contactá al administrador");
  }
};
// Eliminar usuario
const eliminarUsuario = async (req, res) => {
  //Capturar el ID del usuario desde los parámetros de la solicitud
  const usuarioId = req.params.uid;
  //Eliminar el usuario
  await servicioUsuarios.deleteUser({ _id: usuarioId });
  res.sendSuccess("usuario eliminado correctamente");
};


export default {
  obtenerUsaruios,
  guardarUsuarios,
  editarUsuario,
  eliminarUsuario,
};
