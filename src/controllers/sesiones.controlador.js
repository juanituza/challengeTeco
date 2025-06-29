import LoggerService from "../dao/MySql/Managers/LoggerManager.js";
import {  generarToken } from "../utils.js";


//Funcion para manejar el registro y logueo de usuarios
const registro = async (req, res) => {
  try {    
    LoggerService.logger.info(`Usuario registrado: ${req.user.email}`);

    res.enviarExito("Usuario registrado exitosamente");
  } catch (error) {
    LoggerService.logger.error("Error en registro:", error);
    res.enviarErrorInterno("Error interno, contactá al administrador");
  }
};
//Funcion para manejar el inicio de sesión de usuarios
const iniciarSesion = async (req, res) => {
  try {
    //Generar el token de acceso
    const accessToken = generarToken(req.user);
    console.log(req.user);
    
    //envío el token por el body para que el front lo guardo
    res
      .cookie("authToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        sameSite: "strict",
      })
      .enviarExito("Usuario logueado exitosamente");
  } catch (error) {
    res.enviarErrorInterno("Error interno, contactá al administrador");
  }
};


//Funcion para manejar el cierre de sesión de usuarios
const cerrarSesion = async (req, res) => {
  // Eliminar la cookie "authToken"
  res.clearCookie("authToken"); 
  res.send({
    status: "success",
    message: "Sesión cerrada correctamente",
  });
};


export default { registro, iniciarSesion,  cerrarSesion,};
