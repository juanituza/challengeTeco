import LoggerService from "../dao/Mongo/Managers/LoggerManager.js";

const createLogger = (req, res) => {
  const log = LoggerService.logger;
  res.sendStatus(200);
};
export default { createLogger };
