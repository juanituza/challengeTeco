import { faker } from '@faker-js/faker/locale/es';
import ProdModel from "./productsMocks.js";
// import { productService } from "../dao/Managers/Mongo/index.js";
import { productMockService } from "../services/repositories/index.js";

const getProductMock = async (req, res) => {
    try {
        const productMock = await productMockService.getProductMock();
        res.sendSuccessWithPayload(carts);
    } catch (error) {
        res.sendInternalError("Internal server error, contact the administrator");
    }
}

const createProductsMock = async (req, res) => {
    try {
        const products = [];        
        // Creo el producto
        for (let i = 0; i < 100; i++) {
            const product = {
                title: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                price: faker.commerce.price(),
                code: faker.string.uuid(),
                status: faker.datatype.boolean(),
                stock: faker.number.int({min:0,max:50})
            }
            products.push(product);
        }
        productMockService.createProductsMock(products);
        res.sendSuccess('Create mocks succefully');
    } catch (error) {

        res.sendInternalError("Internal server error, contact the administrator");
    }
};


export default {
    getProductMock,
    createProductsMock,

};