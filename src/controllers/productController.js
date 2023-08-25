import ProdModel from "../dao/Mongo/models/products.js";
// import { productService } from "../dao/Managers/Mongo/index.js";
import { productService } from "../services/repositories/index.js";
import productDTO from "../dto/productDTO.js";

import {
  productsErrorIncompleteData,
  productsErrorDuplicateCode,
  productsIdNotFound,
} from "../constants/productsErrors.js";
import ErrorService from "../services/ErrorServicer.js";
import EErrors from "../constants/EErrors.js";
import LoggerService from "../dao/Mongo/Managers/LoggerManager.js";

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

      res.sendSuccessWithPayload({
        ...new productDTO(products) /*DTO PRODUCTS*/,
      });
    }
  } catch (error) {
    LoggerService.error(error);
    res.sendInternalError("Internal server error, contact the administrator");
  }
};

const createProducts = async (req, res) => {
  try {
    const products = await productService.getProducts();
    const user = req.user;
    //Obtento los datos otorgados por body
    // const prod = req.body;
    const {
      title,
      description,
      thumbnail = [],
      price,
      status,
      code,
      stock,
    } = req.body;
    //Valido campos obligatorios
    //si no existe algun campo
    // Extract the ObjectId from the userObject

    const prod = {
      title,
      description,
      thumbnail,
      price,
      status,
      code,
      stock,
      owner: req.user.email,
      // user.role == "ADMIN" ? "ADMIN" : req.user.email,
    };
    if (
      !prod.title ||
      !prod.description ||
      !prod.thumbnail ||
      !prod.price ||
      !prod.status ||
      !prod.code ||
      !prod.stock
    ) {
      //arrojo el error mediante Middleware manejo de errores
      ErrorService.createError({
        name: "Product creation error",
        cause: productsErrorIncompleteData(prod),
        message: "Incomplete data",
        code: EErrors.INCOMPLETE_DATA,
        status: 400,
      });
    }
    //Valido que no se repita el campo "code"
    if (
      typeof products.find((item) => item.code == prod.code) !== "undefined"
    ) {
      //arrojo el error mediante Middleware manejo de errores

      ErrorService.createError({
        name: "Duplicate product code",
        cause: productsErrorDuplicateCode(prod),
        message: "Duplicate product code",
        code: EErrors.DUPLICATE_CODE,
        status: 500,
      });
    }
    // Creo el producto
    const resProd = await productService.createProducts(prod);
    res.sendSuccessWithPayload({ ...new productDTO(resProd) /*DTO PRODUCTS*/ });
  } catch (error) {
    LoggerService.error(error);
    // res.sendUnauthorized("Internal server error, contact the administrator");
    res.status(error.status).send({ status: "error", error: error.name });
  }
};

const getProductsBy = async (req, res) => {
  try {
    const { pid } = req.params;
    //obtengo todos los productos
    const products = await productService.getProducts();
    //Verifico si el ID existe en los productos
    const productId = products.find((p) => p._id.toString() === pid);
    //Si no existe arrojo error
    if (!productId) {
      ErrorService.createError({
        name: "Id not found",
        cause: productsIdNotFound({ pid }),
        message: "Get product error",
        code: EErrors.ID_NOT_FOUND,
        status: 400,
      });
    } else {
      //si existe ID busco el producto y lo devuelvo
      const product = await productService.getProductsBy(pid);
      res.sendSuccessWithPayload({
        ...new productDTO(product) /*DTO PRODUCTS*/,
      });
    }
  } catch (error) {
    LoggerService.error(error);
    res.sendErrorWithPayload(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const updateProduct = req.body;
    const result = await productService.updateProduct(pid, updateProduct);
    res.sendSuccessWithPayload(`Product upgraded successfully`, result);
  } catch (error) {
    LoggerService.error(error);
    res.sendErrorWithPayload(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productService.getProductsBy(pid);
    const user = req.user;

    if (user.role === "premium" && product.owner === user.email) {
      await productService.deleteProduct(pid);
      res.sendSuccess("Product removed successfully");
    } else if (user.role === "ADMIN") {
      await productService.deleteProduct(pid);
      res.sendSuccess("Product removed successfully");
    } else {
      res.sendUnauthorized(
        "Unauthorized, This product was created by another user or an administrator"
      );
    }
  } catch (error) {
    LoggerService.error(error);
    res.sendErrorWithPayload(error);
  }
};

export default {
  getProducts,
  createProducts,
  getProductsBy,
  updateProduct,
  deleteProduct,
};
