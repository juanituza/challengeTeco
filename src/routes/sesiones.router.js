import BaseRouter from "./baseRouter.js";
import { llamarPasaporte } from ".././middlewares/utils.js";
import controladorSesiones from "../controllers/sesiones.controlador.js";


export default class SesionesRutas extends BaseRouter {
  init() {
    // Ruta para el registro de usuarios
    this.post("/register", ["PUBLIC"], llamarPasaporte("registro", { strategyType: "locals" }), controladorSesiones.registro);
    // Ruta para el inicio de sesión de usuarios
    this.post("/login", ["PUBLIC"], llamarPasaporte("acceso", { strategyType: "locals" }), controladorSesiones.iniciarSesion);
    //Ruta para controlar el acceso actual del usuario 
    this.get("/current", ["PUBLIC"], llamarPasaporte("jwt", { strategyType: "jwt" }), controladorSesiones.sesionActual);
    // Ruta para el cierre de sesión de usuarios
    this.post("/logout", ["PUBLIC"], controladorSesiones.cerrarSesion);
  }
}
