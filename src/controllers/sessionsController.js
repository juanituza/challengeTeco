import LoggerService from "../dao/MySql/Managers/LoggerManager.js";
import {  generateToken } from "../utils.js";



const register = async (req, res) => {
  try {
    // Podés agregar un log si querés auditar el registro
    LoggerService.logger.info(`Usuario registrado: ${req.user.email}`);

    res.sendSuccess("Usuario registrado exitosamente");
  } catch (error) {
    LoggerService.logger.error("Error en registro:", error);
    res.sendInternalError("Error interno, contactá al administrador");
  }
};

const login = async (req, res) => {
  try {
    const accessToken = generateToken(req.user);
    //envío el token por el body para que el front lo guardo
    res
      .cookie("authToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        sameSite: "strict",
      })
      .sendSuccess("Login In");
  } catch (error) {
    res.sendInternalError("Internal server error, contact the administrator");
  }
};



const logout = async (req, res) => {
  res.clearCookie("authToken"); // Eliminar la cookie "authToken"
  res.send({
    status: "success",
    message: "Sesión cerrada correctamente",
  });
};


export default { register, login,  logout,};
