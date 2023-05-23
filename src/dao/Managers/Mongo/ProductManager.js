import productsModel from "../../Mongo/models/products.js";

export default class ProductManager {
  getProducts = () => {
    return productsModel.find().lean();
  };
  getProductsBy = (params) => {
    
    return productsModel.findOne(params);
  };
  createProducts = (product) => {
    return productsModel.create(product);
  };
  updateProduct = (id, product) => {
    return productsModel.findByIdAndUpdate(id, { $set: product });
  };
    deleteProduct = (product) =>{
        return productsModel.findByIdAndDelete(product);
    }
}
