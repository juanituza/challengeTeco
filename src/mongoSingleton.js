import mongoose from 'mongoose';
import config from './config.js';

export default class MongoSingleton {
    static #instance;
    constructor() {
        mongoose.connect(config.mongo.URL)
    }

    static getInstance() {
        // si existe una instance
        if (this.#instance) {
            console.log("instance already exists ");
            return this.#instance;
        }
        //Si no hay instance
        this.#instance = new MongoSingleton();
        console.log("connected first instance");
        return this.#instance;
    }

}