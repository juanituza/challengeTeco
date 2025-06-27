import mysql from 'mysql2';
import config from './config.js';
import LoggerService from "./dao/MySql/Managers/LoggerManager.js";

export default class MySQLSingleton  {
    static #instance;
     static #connection;

    constructor() {
          if (!MySQLSingleton.#connection) {
            MySQLSingleton.#connection = mysql.createConnection({
                host: config.connection.HOST,
                database: config.connection.DATABASE,
                user: config.connection.USER,
                password: config.connection.PASS,
                port: config.connection.PORT
            });

            MySQLSingleton.#connection.connect((err) => {
                if (err) {
                    LoggerService.logger.error('Error de conexión a MySQL:', err);
                } else {
                    LoggerService.logger.info('Conectado a MySQL con éxito.');
                }
            });
        }
        
    }

    static getInstance() {
        // si existe una instance
        if (this.#instance) {
            LoggerService.logger.info("instance already exists ");
            return this.#instance;
        }
        //Si no hay instance
        this.#instance = new MySQLSingleton();
        LoggerService.logger.info("connected first instance");
        return this.#instance;
    }

}