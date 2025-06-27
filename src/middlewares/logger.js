import { Logger } from "winston";
import LoggerService from "../dao/MySql/Managers/LoggerManager.js";



const attachLogger = (req, res, next) => {
  req.log = LoggerService.logger;
  req.log.http(
    `${req.method} en ${req.url}  - ${new Date().toLocaleTimeString()}`
  );
  next();
};

export default attachLogger;
