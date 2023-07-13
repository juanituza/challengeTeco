import BaseRouter from "./baseRouter.js";

import { productService } from "../dao/Managers/Mongo/index.js";
import { passportCall} from "../utils.js";
import  productcontroller  from "../controllers/product.controller.js";


// const router = Router();

/* ------------------BASE DE DATOS MONGODB----------- */

export default class ProductRouter extends BaseRouter {
  init() {
    this.get("/", ["PUBLIC"], passportCall("jwt", { strategyType: 'locals' }),productcontroller.getProducts );

    this.post("/", ["ADMIN"], passportCall("jwt", { strategyType: 'locals' }),productcontroller.createProducts);

    this.get("/:pid", ["USER", "ADMIN"], passportCall("jwt", { strategyType: 'locals' }), productcontroller.getProductsBy );

    this.put("/:pid", ["ADMIN"], passportCall("jwt", { strategyType: 'locals' }), productcontroller.updateProduct );
    this.delete("/:pid", ["ADMIN"], passportCall("jwt", { strategyType: 'locals' }), productcontroller.deleteProduct);
  }
}


