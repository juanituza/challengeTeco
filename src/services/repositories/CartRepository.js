export default class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getCarts = () => {
    return this.dao.getCarts();
  };
  getCartsBy = (cid) => {
    return this.dao.getCartsBy(cid);
  };
  createCart = () => {
    return this.dao.createCart();
  };
  addProduct = (cid, cart) => {
    return this.dao.addProduct(cid, cart);
  };
  purchaseCart = (cid,cart) => {
    return this.dao.purchaseCart(cid,cart);
  };
  deleteProduct = (cid) => {
    return this.dao.deleteProduct(cid);
  };
  emptycart = (cid,cart) => {
    return this.dao.emptycart(cid,cart);
  };

  deleteCart = (cid) => {
    return this.dao.deleteCart(cid);
  };
}
