import mysql from 'mysql2';
import config from './config.js';
import LoggerService from "./dao/MySql/Managers/LoggerManager.js";

export default class MySQLSingleton  {
    static #instance;
     static #connection;
    //Constructor privado que crea la conexión a MySQL .
    constructor() {
          //si aún no existe conexion  
          if (!MySQLSingleton.#connection) {
            //creo la conexion
            MySQLSingleton.#connection = mysql.createConnection({
                host: config.connection.HOST,
                database: config.connection.DATABASE,
                user: config.connection.USER,
                password: config.connection.PASS,
                port: config.connection.PORT
            });
            //Si no existe envio el error
            MySQLSingleton.#connection.connect((err) => {
                if (err) {
                    LoggerService.logger.error('Error de conexión a MySQL:', err);
                } else {
                    LoggerService.logger.info('Conectado a MySQL con éxito.');
                }
            });
        }
        
    }
    //Creo la instancia 
    static obtenerInstancia() {
         // Si la instancia ya fue creada, la reutilizamos
        if (this.#instance) {
            LoggerService.logger.info("La instancia ya existe ");
            return this.#instance;
        }
        // Si no hay instancia, creamos la primera
        this.#instance = new MySQLSingleton();
        LoggerService.logger.info("Primera instancia conectada");
        return this.#instance;
    }

}