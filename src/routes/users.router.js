import BaseRouter from "./baseRouter.js";

import userController from "../controllers/usuarios.controlador.js";
import {llamarPasaporte} from "../utils.js";
// const router = Router();

export default class UserRouter extends BaseRouter{
  init(){
    this.get("/admin", ["ADMIN"], llamarPasaporte("jwt", { strategyType: 'locals' }),userController.obtenerUsaruios);
    this.post("/", ["ADMIN"], llamarPasaporte("jwt", { strategyType: 'locals' }), userController.guardarUsuarios);
    this.put("/:uid", ["ADMIN"], llamarPasaporte("jwt", { strategyType: 'locals' }), userController.editarUsuario );
    this.delete("/:uid", ["ADMIN"], llamarPasaporte("jwt", { strategyType: 'locals' }), userController.eliminarUsuario);
  }
}

