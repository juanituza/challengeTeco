import BaseRouter from "./baseRouter.js";
import { llamarPasaporte } from "../utils.js";
import controladorSesiones from "../controllers/sesiones.controlador.js";
import { ROLES } from "../../shared/roles.js";


export default class SesionesRutas extends BaseRouter {
  init() {
    // Ruta para el registro de usuarios
    this.post(
      "/register",
      ["PUBLIC"],
      
      llamarPasaporte("register", { strategyType: "locals" }),

      controladorSesiones.registro
    );
    // Ruta para el inicio de sesión de usuarios
    this.post(
      "/login",
      ["PUBLIC"],
     
      llamarPasaporte("login", { strategyType: "locals" }),
      controladorSesiones.iniciarSesion
    );


   this.get("/current", ["PUBLIC"], llamarPasaporte("jwt", { strategyType: "jwt" }), (req, res) => {
  if (!req.user) {
    return resenviarNoAutorizado({ error: "No autenticado" });
  }

  res.send({ status: "success", payload: req.user });
});




    // Ruta para el cierre de sesión de usuarios
    this.post(
      "/logout",
      ["USER", "PREMIUM", "ADMIN"],
     
      llamarPasaporte("jwt", { strategyType: "locals" }),
      controladorSesiones.cerrarSesion
    );
  }
}
