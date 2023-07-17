// import mongoose from "mongoose";

// import config from '../config.js';
import MongoSingleton from "../mongoSingleton.js";

// import ProductMongoDao from './Mongo/Managers/ProductManager.js';
// import CartMongoDao from './Mongo/Managers/cartManager.js';
// import UserMongoDao from './Mongo/Managers/userManager.js';
// import FsDao from './FileSystem/ProductManager.js';



//defino la persistencia a utilizar:
const persistence = "MONGO";

// a partir de la variable "persistence" defino DAO a tomar
export default class PersistenceFactory {
  

    static async getPersistence () {
        let  productsDao;
        // let usersDao;
        // let cartsDao;       

        switch (persistence) {
            //caso FileSystem
            case "FS":
                const { default: FsDao } = await import('./FileSystem/ProductManager.js');
                productsDao = new FsDao();
                break;
            //Caso Mongo
            case "MONGO":              
                // mongoose.connect(config.mongo.URL);
                MongoSingleton.getInstance();
           
                const {default: productMongoDao} = await import('./Mongo/Managers/ProductManager.js');
                productsDao = new productMongoDao();

                // const {default: cartMongoDao} = await import('./Mongo/Managers/cartManager.js');
                // cartsDao = new cartMongoDao();

                // const {default: userMongoDao} = await import('./Mongo/Managers/userManager.js');
                // usersDao = new userMongoDao();
               
                break;
        }
        return {productsDao};
    }
   
}
    