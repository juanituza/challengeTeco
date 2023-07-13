import ProdModel from "../dao/Mongo/models/products.js";
import { productService } from "../dao/Managers/Mongo/index.js";

const getProducts = async (req, res) => {
    try {
        // declaro los parametros de la query
        const limit = parseInt(req.query.limit) || 10;
        const category = req.query.category;
        const page = parseInt(req.query.page) || 1;

        //metodo para agregar links pagina anterior y siguiente
        const prevAntPage = (products) => {
            if (products.hasPrevPage) {
                products.prevLink = `/api/products?page=${products.prevPage}`;
            } else {
                products.prevLink = null;
            }
            if (products.hasNextPage) {
                products.nextLink = `/api/products?page=${products.nextPage}`;
            } else {
                products.nextLink = null;
            }
        };

        //Filtro title, limit y page
        //si categoria no existe devuelvo todos los productos
        if (!category) {
            const products = await ProdModel.paginate(
                {},
                { limit, page, lean: true }
            );
            prevAntPage(products);

            res.status(201).send({
                status: "success",
                payload: `Category does not exist`,
                products,
            });
        } else {
            // si no filtro por el argumento category
            const products = await ProdModel.paginate(
                { title: category },
                { limit, page, lean: true }
            );

            prevAntPage(products);

            res.sendSuccessWithPayload({ payload: products });
        }
    } catch (error) {
        res.sendInternalError("Internal server error, contact the administrator");
    }
};


const createProducts = async (req, res) => {
    try {
        //obtengo todos los productos
        const products = await productService.getProducts();
        //Obtento los datos otorgados por body
        const prod = req.body;
        //Valido campos obligatorios
        if (
            !prod.title ||
            !prod.description ||
            !prod.price ||
            !prod.code ||
            !prod.status ||
            !prod.stock
        ) {
            return res.sendUnauthorized('Incomplete data');
        }
        //Valido que no se repita el campo "code"
        if (
            typeof products.find((item) => item.code == prod.code) !== "undefined"
        ) {
            return res.sendUnauthorized('Duplicate product code');
        }
        // Creo el producto
        const resProd = await productService.createProducts(prod);
        res.status(201).send({ status: "success", payload: resProd });
    } catch (error) {
        ressendInternalError("Internal server error, contact the administrator");
    }
};


const getProductsBy = async (req, res) => {
    const { pid } = req.params;
    const product = await productService.getProductsBy({ _id: pid });
    if (!product)
        return res.sendNotFound("prodcut not found");
    res.sendSuccessWithPayload(`product is : ${product}`);
};

const updateProduct = async (req, res) => {
    const { pid } = req.params;
    const updateProduct = req.body;
    const result = await productService.updateProduct(pid, updateProduct);
    res.sendSuccessWithPayload(`Product upgraded successfully`,result,);
};

const deleteProduct = async (req, res) => {
    const { pid } = req.params;  
    const result =  await productService.deleteProduct(pid);    
    res.sendSuccess("Product removed successfully");
}



export default { getProducts, createProducts, getProductsBy, updateProduct, deleteProduct };