import BaseRouter from "./baseRouter.js";

import userController from "../controllers/usuarios.controlador.js";
import {llamarPasaporte} from "../utils.js";
import { ROLES } from "../../shared/roles.js";
// const router = Router();

export default class UserRouter extends BaseRouter{
  init(){
    this.get("/admin", this.verificarPermisos([ROLES.ADMIN, ROLES.EDITOR]), llamarPasaporte("jwt", { strategyType: 'locals' }),userController.obtenerUsaruios);
    this.post("/", this.verificarPermisos([ROLES.ADMIN, ROLES.EDITOR]), llamarPasaporte("jwt", { strategyType: 'locals' }), userController.guardarUsuarios);
    this.put("/:uid", this.verificarPermisos([ROLES.ADMIN, ROLES.EDITOR]), llamarPasaporte("jwt", { strategyType: 'locals' }), userController.editarUsuario );
    this.delete("/:uid", this.verificarPermisos([ROLES.ADMIN, ROLES.EDITOR]), llamarPasaporte("jwt", { strategyType: 'locals' }), userController.eliminarUsuario);
  }
}

