import BaseRouter from "./baseRouter.js";
import userController from "../controllers/usuarios.controlador.js";
import { llamarPasaporte, verificarPermisos } from ".././middlewares/utils.js";
import { ROLES } from "../../shared/roles.js";


export default class UserRouter extends BaseRouter {
  init() {
    //Ruta para obtener a los usuario en el panel administrador
    this.get("/obtener-usuarios",llamarPasaporte("jwt", { strategyType: 'locals' }),verificarPermisos([ROLES.ADMIN, ROLES.EDITOR]),userController.obtenerUsaruios);
    //Ruta para obtener el usuario por ID y poder editarlo por ejemplo
    this.get("/:id", llamarPasaporte("jwt", { strategyType: 'locals' }), verificarPermisos([ROLES.ADMIN, ROLES.EDITOR]), userController.obtenerUsuarioPorId);
    //Ruta para editar el usuario
    this.put("/:id", llamarPasaporte("jwt", { strategyType: 'locals' }), verificarPermisos([ROLES.ADMIN, ROLES.EDITOR]), userController.editarUsuario);
    //Ruta para eliminar el usuario
    this.delete("/:id", llamarPasaporte("jwt", { strategyType: 'locals' }), verificarPermisos([ROLES.ADMIN, ROLES.EDITOR]), userController.eliminarUsuario);
  }
}

