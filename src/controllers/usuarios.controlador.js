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
  const usuarios = await servicioUsuarios.obtenerUsuarios();
  //
  const analizadorUsuarios = usuarios.map((usuario) => new usersDTO(usuario));
  
  res.enviarExitoConCarga(analizadorUsuarios);
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
    const resultado = await servicioUsuarios.crearUsuario(usuario);
    console.log("✅ Usuario registrado:", resultado);
    res.enviarExitoConCarga({ resultado });
  } catch (error) {
    res.enviarErrorInterno("Internal error");
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
    await servicioUsuarios.editarUsuario(
      { _id: usuarioId },
      { role: usuarioEditado }
    );
  
    // res.sendSuccessWithPayload({ result });
    res.enviarExito("Usuario actualizado correctamente");
  } catch (error) {
    res.enviarErrorInterno("Error interno, contactá al administrador");
  }
};
// Eliminar usuario
const eliminarUsuario = async (req, res) => {
  //Capturar el ID del usuario desde los parámetros de la solicitud
  const usuarioId = req.params.uid;
  //Eliminar el usuario
  await servicioUsuarios.eliminarUsuario({ _id: usuarioId });
  res.enviarExito("usuario eliminado correctamente");
};


export default {
  obtenerUsaruios,
  guardarUsuarios,
  editarUsuario,
  eliminarUsuario,
};
