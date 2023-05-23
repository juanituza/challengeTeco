import cartsModel from "../../Mongo/models/carts.js";
import productsModel from "../../Mongo/models/products.js";

const productM = new productsModel();

export default class CartManager {
  getCarts = () => {
    return cartsModel.find().lean();
  };
  getCartsBy = (params) => {
    return cartsModel.findOne(params).lean();
  };

  createCart() {
    return cartsModel.create({ products: [] });
  }
  addProduct = (cid, pid) => {
    const prodId = productsModel.getProductsBy(pid);
    const cartId = cartsModel.getCartsBy(cid);
    

    const updatedCart = cartsModel.updateOne(
      { _id: cartId },
      { $push: { products: { product: new moongose.Types.objectId(prodId) } } }
    );
    // const populatedCart  = cartsModel.findOne({ _id: cartId }).populate("products.product");
    // console.log((JSON.stringify(cart,null,'\t')));

    return updatedCart;

   

    // const newProduct = cartId.products.find(
    //     ({ product }) => product == pid);
    // if (newProduct) {
    //     newProduct.quantity += 1;
    //   }else{
    //     cartId.products.push ( {product: prodId, quantity:1});
    //   }

    // cartId.save();

    // return cartId;
  };

  updateCart = (id, cart) => {
    return cartsModel.findByIdAndUpdate(id, { $set: cart });
  };
  deleteCart = (cart) => {
    return cartsModel.findByIdAndDelete(cart);
  };
}
