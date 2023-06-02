import productsModel from "../../Mongo/models/products.js";

export default class ProductManager {
  getProducts = async () => {
    return await  productsModel.find().lean();
  };
  getProductsBy = async (pid) => {
    
    return await  productsModel.findById(pid);
  };
  createProducts =async  (product) => {
    return await productsModel.create(product);
  };
  updateProduct = async (id, product) => {
    return await productsModel.findByIdAndUpdate(id, { $set: product });
  };
    deleteProduct =async  (product) =>{
        return await productsModel.findByIdAndDelete(product);
    }
}
