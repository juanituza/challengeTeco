export default class ProductMockRepository {
    constructor (dao) {
        this.dao = dao;
    }

    getProductMock = () => {
        return this.dao.getProductMock();
    };

    createProductsMock = (product) => {
        return this.dao.createProductsMock(product); 
    };

    getProductsMockBy = (pid) => {
        return this.dao.getProductsMockBy(pid);
    };

}