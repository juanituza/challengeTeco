import productsMocksModel from "./productsMocks.js";

export default class ProductManager {
    getProductMock = async () => {
        return await productsMocksModel.find().lean();
    }
    getProductsMockBy = async (pid) => {

        return await productsMocksModel.findById(pid).lean();
    };
    createProductsMock = async (product) => {

        return await productsMocksModel.create(product);



    };


}



