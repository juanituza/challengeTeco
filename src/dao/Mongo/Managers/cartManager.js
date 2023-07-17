import cartsModel from "../models/carts.js";
import { productService } from "../../../services/repositories/index.js";

export default class CartManager {
  getCarts = async () => {
    return await cartsModel.find().lean();
  };
  getCartsBy = async (cid) => {
    return await cartsModel.findById(cid).lean();
  };

  createCart = async () => {
    return await cartsModel.create({ products: [] });
  };

  addProduct = async (cid, pid) => {
    //obtengo el producto para agregar
    const prod = await productService.getProductsBy(pid);
    //obtengo el carrito
    const cart = await this.getCartsBy(cid);
    console.log(cart);

    // verifico si el producto es nuevo
    const existingProduct = cart.products.find(
      ({ product }) => product._id.toString() === pid
    );
    // si el producto es undefined lo agrego al arreglo products
    if (existingProduct === undefined) {
      cart.products.push({ product: prod, quantity: 1 });

      //si el producto existe agrego cantidad
    } else {
      existingProduct.quantity += 1;
    }
    // guardo el carrito
    await cartsModel.updateOne({ _id: cid }, { $set: cart });
    return cart;
  };

  deleteCart = (cart) => {
    return cartsModel.findByIdAndDelete(cart);
  };
}
