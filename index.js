import ProductManager from "./Managers/ProductManager+Mckenna.js";

const prod = new ProductManager();
prod.getProducts();

// const context = async()=>{

//     const test = await prod.getProducts();
    
//     let testProduct1 = {
//         title: "remera",
//         description: "BLACK",
//         price: 500,
//         thumbnail :"img",
//         code :300,
//         stock: 50
//     }
//     let testProduct2 = {
//         title: "remera",
//         description: "BLACK",
//         price: 500,
//         thumbnail :"img",
//         code :301,
//         stock: 50
//     }
//     let testProduct3 = {
//         title: "remera",
//         description: "BLACK",
//         price: 500,
//         thumbnail :"img",
//         code :302,
//         stock: 50
//     }
//     let testProduct4 = {
//         title: "remera",
//         description: "BLACK",
//         price: 500,
//         thumbnail :"img",
//         code :303,
//         stock: 50
//     }
//     let testProduct5 = {
//         title: "remera",
//         description: "BLACK",
//         price: 500,
//         thumbnail :"img",
//         code :304,
//         stock: 50
//     }
//     let testProduct6 = {
//         title: "remera",
//         description: "BLACK",
//         price: 500,
//         thumbnail :"img",
//         code :305,
//         stock: 50
//     }
//     await prod.createProducts(testProduct1);
//     await prod.createProducts(testProduct2);
//     await prod.createProducts(testProduct3);
//     await prod.createProducts(testProduct4);
//     await prod.createProducts(testProduct5);
//     await prod.createProducts(testProduct6);
// }

// context();

// prod.getProductById(4);

// prod.updateProduct(4,'price',100);
// prod.deleProduct(2)
