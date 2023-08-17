import MailingService from "../services/MailingService.js";
import DTemplates from "../constants/DTemplates.js";
import LoggerService from "../dao/Mongo/Managers/LoggerManager.js";
import { generateToken } from "../utils.js";

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
    //envío el token por el body para que el front lo guarde
    // res.send({ estatus: "success", accessToken })
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
    // console.log(req.user);
    // console.log(user);
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

export default { register, login, loginGitHub };
