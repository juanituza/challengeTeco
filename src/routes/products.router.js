import BaseRouter from "./baseRouter.js";

// import { productService } from "../dao/Managers/Mongo/index.js";
import { passportCall} from "../utils.js";
import  productController  from "../controllers/product.controller.js";


// const router = Router();

/* ------------------BASE DE DATOS MONGODB----------- */

export default class ProductRouter extends BaseRouter {
  init() {
    this.get("/", ["PUBLIC"], passportCall("jwt", { strategyType: 'locals' }),productController.getProducts );
    this.post("/", ["ADMIN"], passportCall("jwt", { strategyType: 'locals' }), productController.createProducts);
    this.get("/:pid", ["USER", "ADMIN"], passportCall("jwt", { strategyType: 'locals' }), productController.getProductsBy );
    this.put("/:pid", ["ADMIN"], passportCall("jwt", { strategyType: 'locals' }), productController.updateProduct );
    this.delete("/:pid", ["ADMIN"], passportCall("jwt", { strategyType: 'locals' }), productController.deleteProduct);
  }
}


