import mongoose from 'mongoose';
import config from './config.js';
import LoggerService from "./dao/Mongo/Managers/LoggerManager.js";

export default class MongoSingleton {
    static #instance;
    constructor() {
        mongoose.connect(config.mongo.URL)
        
    }

    static getInstance() {
        // si existe una instance
        if (this.#instance) {
            LoggerService.logger.info("instance already exists ");
            return this.#instance;
        }
        //Si no hay instance
        this.#instance = new MongoSingleton();
        LoggerService.logger.info("connected first instance");
        return this.#instance;
    }

}