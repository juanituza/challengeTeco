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
    console.log(prod);
    //obtengo el carrito
    const cart = await this.getCartsBy(cid);
    

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


  purchaseCart = async (cid,pid) =>{
    const cart = await this.getCartsBy(cid);
    const prod = await productService.getProductsBy(pid);

    const productsToPurchase = [];

    if (cart.products.product.quantity <= prod.stock) {
      productsToPurchase.push({ product, quantity: quantityInCart });
    } else {
      return res.status(400).json({
        message: `El producto '${product.name}' no tiene suficiente stock para la cantidad indicada en el carrito`,
      });
    }

  }

  deleteCart = (cart) => {
    return cartsModel.findByIdAndDelete(cart);
  };
}
