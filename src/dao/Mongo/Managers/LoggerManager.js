import winston from "winston";

class LoggerService {
  constructor(env) {
    //opciones de level y colores:
    this.options = {
      levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5,
      },
      colors: {
        fatal: "bold red redBG",
        error: "red",
        warning: "white",
        info: "magenta",
        http: "gray",
        debug: "green",
      },
    };

    //creo el logger
    this.logger = this.createLogger(env);
    //agrego colores al logger
    winston.addColors(this.options.colors);
  }

  createLogger = (env) => {
    switch (env) {
      case "dev":
        const colorizer = winston.format.colorize(this.options.colors);
        return winston.createLogger({
          levels: this.options.levels,
          transports: [
            new winston.transports.Console({
              level: "debug",
              format: winston.format.combine(
                winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
                winston.format.splat(),
               
                winston.format.printf((msg) =>
                  colorizer.colorize(
                    msg.level,
                    `${msg.timestamp} - ${msg.level}: ${msg.message}`
                  )
                )
              ),
            }),
          ],
        });
      case "prod":
        return winston.createLogger({
          levels: this.options.levels,
          transports: [
            new winston.transports.Console({ level: "info" }),
            new winston.transports.File({
              level: "error",
              filename: "log/errors.log",
            }),
          ],
        });
    }
  };

  error(msg, meta) {
    this.logger.error(msg, meta);
  }
}
export const loggerTest = winston.createLogger({
  levels: winston.config.syslog.levels,
  transports: [
    new winston.transports.Console({ level: "debug" }),
    new winston.transports.File({
      filename: "combined.log",
      level: "info",
    }),
  ],
});
export default new LoggerService("dev");
