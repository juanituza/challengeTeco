import BaseRouter from "./baseRouter.js";

// import { productService } from "../dao/Managers/Mongo/index.js";
import { passportCall} from "../utils.js";
import  productController  from "../controllers/product.controller.js";
import productMockController from "../mocks/productMock.controller.js";


// const router = Router();

/* ------------------BASE DE DATOS MONGODB----------- */

export default class ProductRouter extends BaseRouter {
  init() {
    this.get("/", ["PUBLIC"], passportCall("jwt", { strategyType: 'locals' }),productController.getProducts );
    this.get("/:pid", ["USER", "ADMIN"], passportCall("jwt", { strategyType: 'locals' }), productController.getProductsBy );
    this.post("/", ["ADMIN"], passportCall("jwt", { strategyType: 'locals' }), productController.createProducts);
    this.put("/:pid", ["ADMIN"], passportCall("jwt", { strategyType: 'locals' }), productController.updateProduct );
    this.delete("/:pid", ["ADMIN"], passportCall("jwt", { strategyType: 'locals' }), productController.deleteProduct);


    this.get("/mockingproducts", ["ADMIN"], passportCall("jwt", { strategyType: 'locals' }), productMockController.getProductMock);
    this.post("/mockingproducts", ["ADMIN"], passportCall("jwt", { strategyType: 'locals' }), productMockController.createProductsMock);
  }
}


