import BaseRouter from "./baseRouter.js";
import { passportCall } from "../utils.js";
import cartController from "../controllers/cart.controller.js";

/*------------------MONGO--------------------------*/

export default class CartRouter extends BaseRouter {
  init() {
    this.get("/", ["USER"], passportCall("jwt", { strategyType: 'locals' }),cartController.getCarts);
    this.get("/:cid", ["USER"], passportCall("jwt", { strategyType: 'locals' }), cartController.getCartsBy );
    this.post("/", ["USER"], passportCall("jwt", { strategyType: 'locals' }), cartController.createCart);
    this.post("/:pid", ["USER"], passportCall("jwt", { strategyType: 'jwt' }),cartController.addProduct);
    this.put("/:cid/:pid", ["USER"], passportCall("jwt", { strategyType: 'jwt' }), cartController.editCart );
    this.put("/:cid/products/:pid", ["USER"], passportCall("jwt", { strategyType: 'jwt' }), cartController.editQuantity);
    this.delete("/:cid/products/:pid", ["USER"], passportCall("jwt", { strategyType: 'jwt' }), cartController.deleteProduct);
    this.delete("/:cid", ["ADMIN"], passportCall("jwt", { strategyType: 'jwt' }), cartController.deleteCart );
  }
}
