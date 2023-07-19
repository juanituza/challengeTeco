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
  addProduct = (cid, pid) => {
    return this.dao.addProduct(cid, pid);
  };
  purchaseCart = (cid) =>{
    return this.dao.purchaseCart(cid);
  }

  deleteCart = (cid) => {
    return this.dao.deleteCart(cid);
  };
}
