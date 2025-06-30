// import { usersService } from "../dao/Managers/Mongo/index.js";
import { servicioUsuarios } from "../services/repositorios/index.js";
import { createHash } from ".././middlewares/utils.js";

// Obtener los usuarios
const obtenerUsaruios = async (req, res) => {
  //Obtener los usuarios desde el servicio
   try {
    const usuarios = await servicioUsuarios.obtenerUsuarios();
    res.enviarExitoConCarga(usuarios);
  } catch (error) {
    res.enviarErrorInterno("Error al obtener los usuarios");
  }
};
// Obtener un usuario por ID
const obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await servicioUsuarios.obtenerUsuarioPorId(id);

    if (!usuario) {
      return res.status(404).json({ status: "error", error: "Usuario no encontrado" });
    }

    res.enviarExitoConCarga(usuario);
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    res.enviarErrorInterno("Error al obtener el usuario");
  }
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

// //Editar usuario
// const editarUsuario = async (req, res) => {
//   try {
//     //Capturar el ID del usuario desde los parámetros de la solicitud
//     const usuarioId = req.params.id;
    
    
    
    
//     //Capturar los datos del usuario desde el cuerpo de la solicitud
//     const { nombre, email, password } = req.body;
//     const datoModificado = { nombre, email };
   
    
//     if (password && password.trim() !== "") {
//       const hashed = await hashPassword(password); // tu función de hash
//       datoModificado.password = hashed;
//     }
    
//     //Editar el usuario
//      await servicioUsuarios.editarUsuario( usuarioId, datoModificado);
      
      
//     // res.sendSuccessWithPayload({ result });
//     res.enviarExitoConCarga("Usuario actualizado correctamente : " );
//   } catch (error) {
//     res.enviarErrorInterno("Error interno, contactá al administrador");
//   }
// };

const editarUsuario = async (req, res) => {
  try {
    const usuarioId = req.params.id;

    const { nombre, email, password, rol } = req.body;

    const datoModificado = {};

    if (nombre) datoModificado.nombre = nombre;
    if (email) datoModificado.email = email;
    if (rol) datoModificado.rol = rol;

    if (password && password.trim() !== "") {
      const hashed = await createHash(password);
      datoModificado.password = hashed;
    }

    const resultado = await servicioUsuarios.editarUsuario(usuarioId, datoModificado);

    res.enviarExitoConCarga("Usuario actualizado correctamente", resultado);
  } catch (error) {
    console.error("Error al editar usuario:", error);
    res.enviarErrorInterno("Error interno, contactá al administrador");
  }
};





// Eliminar usuario
const eliminarUsuario = async (req, res) => {
  //Capturar el ID del usuario desde los parámetros de la solicitud
  const usuarioId = req.params.id;
  console.log(usuarioId);
  
  //Eliminar el usuario
  await servicioUsuarios.eliminarUsuario( usuarioId );
  res.enviarExito("usuario eliminado correctamente");
};


export default {
  obtenerUsuarioPorId,
  obtenerUsaruios,
  guardarUsuarios,
  editarUsuario,
  eliminarUsuario,
};
