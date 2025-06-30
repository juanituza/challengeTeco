import LoggerService from "../dao/MySql/Managers/LoggerManager.js";
import {  generarToken } from ".././middlewares/utils.js";


//Funcion para manejar el registro y logueo de usuarios
const registro = async (req, res) => {
  try { 
    LoggerService.logger.info(`Usuario registrado: ${req.user.email}`);
    //Envio de exito al registrarse
    res.enviarExito("Usuario registrado exitosamente");
  } catch (error) {
    //Si existe un error lo capturo y envio
    LoggerService.logger.error("Error en registro:", error);
    res.enviarErrorInterno("Error interno, contactá al administrador");
  }
};
//Funcion para manejar el inicio de sesión de usuarios
const iniciarSesion = async (req, res) => {
  try {
    // JWT generado correctamente
    const accessToken = generarToken(req.user); 
    //Con el usuario capturado genero la cookie con el nombre authToken
    res
      .cookie("authToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24, // 1 día
        httpOnly: true,
        sameSite: "strict",
        path: "/",
      })
      .enviarExito("Usuario logueado exitosamente");
  } catch (error) {
    res.enviarErrorInterno("Error interno, contactá al administrador");
  }
};
//Funcion para manejar el cierre de sesión de usuarios
const cerrarSesion = async (req, res) => {
  // Eliminar la cookie "authToken" 
  res.clearCookie("authToken", {
  httpOnly: true,
  sameSite: "strict",
  path: "/",
});
  res.enviarExitoConCarga({
    message: "Sesión cerrada correctamente",
  });
};

////Funcion para manejar la sesion actual y que este activa
const sesionActual = (req, res) => { 
  if (req.user) {
    res.send({
      status: "success",
      payload: req.user,
    });
  } else {
    res.status(401).send({ status: "error", message: "No hay sesión activa" });
  }
};

export default { registro, iniciarSesion,  cerrarSesion,sesionActual};
