import cartsModel from "../../Mongo/models/carts.js";
import productsManager from "./ProductManager.js";

const products = new productsManager();
const cartsM = new cartsModel();

export default class CartManager {
  getCarts = async () => {
    return await cartsModel.find().lean();
  };
  getCartsBy = async (cid) => {

    return await cartsModel.findById(cid);

  };

  createCart = async () => {
    return await cartsModel.create({ products: [] });
  };


  addProduct = async (cid, pid) => {
    //obtengo el producto para agregar
    const prod = await products.getProductsBy(pid); 
    //obtengo el carrito 
    const cartId = await this.getCartsBy(cid);  
    //verifico si el producto es nuevo
    const newProduct = cartId.products.find(
      ({ product }) => product.id == pid);
   
    //si el producto existe agrego cantidad
    if (newProduct) {
      newProduct.quantity += 1;
    // sino lo agrego al arreglo products
    } else {
      cartId.products.push({ product: prod, quantity: 1 });
    }
    // guardo el carrito
    cartId.save();

    return cartId;

  };
  deleteCart = (cart) => {
    return cartsModel.findByIdAndDelete(cart);
  };
}
