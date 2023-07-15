export default class ProductService {
  constructor(dao) {
    this.dao = dao;
  }

  getProducts = () => {
    return this.dao.getProducts();
  };

  createProducts = (product) => {
    return this.dao.createProducts(product);
  };

  getProductsBy = (pid) => {
    return this.dao.getProductsBy(pid);
  };

  updateProduct = (id, product) => {
    return this.dao.updateProduct(id, product);
  };

  deleteProduct = (params) => {
    return this.dao.deleteProduct(params);
  };
}
