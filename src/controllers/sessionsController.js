import MailingService from "../services/MailingService.js";
import DTemplates from "../constants/DTemplates.js";
import LoggerService from "../dao/Mongo/Managers/LoggerManager.js";



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


export default {register}
