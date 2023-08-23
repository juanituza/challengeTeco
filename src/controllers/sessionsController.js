import jwt from "jsonwebtoken";
import config from "../config.js";
import MailingService from "../services/MailingService.js";
import DTemplates from "../constants/DTemplates.js";
import LoggerService from "../dao/Mongo/Managers/LoggerManager.js";
import { createHash, generateToken, validatePassword } from "../utils.js";
import { usersService } from "../services/repositories/index.js";
import RestoreTokenDTO from "../dto/restoresTokenDTO.js";

const register = async (req, res) => {
  const mailingService = new MailingService();
  try {
    const result = await mailingService.sendMail(
      req.user.email,
      DTemplates.WELCOME,
      { user: req.user }
    );
    res.sendSuccess("Registered");
  } catch (error) {
    LoggerService.error;
    res.sendInternalError("Internal server error, contact the administrator");
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

const loginGitHub = (req, res) => {
  try {
    const user = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    };
    const accessToken = generateToken(req.user);
    //envío el token por el body para que el front lo guarde
    // res.send({ estatus: "success", accessToken })
    res
      .cookie("authToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        sameSite: "strict",
      })
      .sendSuccess("Logueado con github");
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

const restoreRequest =  async (req, res) => {
  //capturo el mail del front por body
  const {email} = req.body;
  // si no existe email
  if (!email) return res.sendNotFound("Email not sent");
  // si existe email busco el usuario
  const user = await usersService.getUserBy({email});
  // si no existe usuario
  if(!user) return res.sendNotFound(
    "Invalid email - Not found in our databases, email is not found in our databases"
  );
  //si existe el usuario y verificamos que el mail está en la db
  // creo un restoreToken
  const restoreToken = generateToken(RestoreTokenDTO.getfrom(user));
  const mailingService = new MailingService();
  const result = await mailingService.sendMail(user.email,DTemplates.RESTORE,{restoreToken});
  res.sendSuccess("Email sent successfully");
}



// const restorePassword = async (req, res) => {
//   const { email, password } = req.body;
//   //Verifico si existe el usuario
//   const user = await usersService.getUserBy({ email });

//   if (!user) return res.sendUnauthorized("User doesn't exist");
//   //Comparo password nuevo con el antiguo
//   const isSamePassword = await validatePassword(password, user.password);
//   if (isSamePassword)
//     return res.sendUnauthorized(
//       "Cannot replace password with current password"
//     );
//   //Si es diferente actualizo password
//   const newHashPassword = await createHash(password); //hasheo password nuevo
//   const result = await usersService.updateUser(
//     { email },
//     { password: newHashPassword }
//   );
//   res.sendSuccess("Password updated successfully");
// };

const restorePassword = async (req, res) => {
 
  const { password, token } = req.body;
   try {
     const tokenUser = jwt.verify(token, "jwtSecret");
     const user = await usersService.getUserBy({ email: tokenUser.email });
     console.log(user);
     //Verificar si la contraseña es la misma
     const isSamePassword = await validatePassword(password, user.password);
     if (isSamePassword)
       return res.sendUnauthorized("Cannot replace password with current password");
    //  hasheo password nuevo
     const newHashPassword = await createHash(password);
  
       const result = await usersService.updateUser(
         { _id: user._id },
         { password: newHashPassword }
       );
       res.sendSuccess("Password updated successfully");
   } catch (error) {
       LoggerService.error;
       res.sendInternalError(
         "Internal server error, contact the administrator"
       );
   }



  
  };


export default { register, login, loginGitHub, logout, restoreRequest, restorePassword };
