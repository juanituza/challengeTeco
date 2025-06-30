import { Router } from "express";
import { llamarPasaporte } from ".././middlewares/utils.js";


/**
 * Clase BaseRouter
 * 
 * Esta clase sirve como clase base para definir routers personalizados.
 * Permite registrar rutas con un flujo predefinido de middlewares:
 * - Autenticación con JWT (Passport)
 * - (Opcional) Verificación de permisos
 * - Inyección de métodos de respuesta personalizados (res.enviarExito, etc.)
 * - Callbacks de los controladores (async-safe)
 */


export default class BaseRouter {
  //constructor de la clase
  constructor() {
    // Inicializa un nuevo router de Express
    this.router = Router();
    // Método opcional a sobrescribir por clases hijas
    this.init();
  }
  // Devuelve el router ya configurado para montarlo en la app principal.
  getRouter() {
    return this.router;
  }
  //Método vacío que puede ser sobrescrito por las subclases para registrar rutas.
  init() { }
  //Registra una ruta GET con autenticación y middleware de respuestas.
  get(path, permisos, ...callbacks) {
    this.router.get(
      path,
      llamarPasaporte("jwt", { strategyType: "jwt" }),
      // verificarPermisos(permisos),
      this.generarRespuestasPersonalizadas,
      this.applyCallbacks(callbacks)
    );
  }
  //Registra una ruta POST con autenticación y middleware de respuestas.
  post(path, permisos, ...callbacks) {
    this.router.post(
      path,
      llamarPasaporte("jwt", { strategyType: "jwt" }),
      // verificarPermisos(permisos),
      this.generarRespuestasPersonalizadas,
      this.applyCallbacks(callbacks)
    );
  }
  //Registra una ruta PUT con autenticación y middleware de respuestas.
  put(path, permisos, ...callbacks) {
    this.router.put(
      path,
      llamarPasaporte("jwt", { strategyType: "jwt" }),
      // verificarPermisos(permisos),
      this.generarRespuestasPersonalizadas,
      this.applyCallbacks(callbacks)
    );
  }
  //Registra una ruta DELETE con autenticación y middleware de respuestas.
  delete(path, permisos, ...callbacks) {
    this.router.delete(
      path,
      llamarPasaporte("jwt", { strategyType: "jwt" }),
      // verificarPermisos(permisos),
      this.generarRespuestasPersonalizadas,
      this.applyCallbacks(callbacks)
    );
  }
  //Middleware que inyecta métodos personalizados en `res` para unificar respuestas del servidor.
  generarRespuestasPersonalizadas = (req, res, next) => {
    // Envía una respuesta de éxito con un mensaje
    res.enviarExito = (mensaje) => res.send({ status: "success", message: mensaje });

    // Envía una respuesta de éxito con un payload
    res.enviarExitoConCarga = (carga) =>
      res.send({ status: "success", payload: carga });

    // Envía un error interno del servidor
    res.enviarErrorInterno = (error) =>
      res.status(500).send({ status: "error", error });

    // Envía un error con payload personalizado
    res.enviarErrorConCarga = (carga) =>
      res.status(400).send({ status: "error", payload: carga });

    // Envía un error de no autorizado
    res.enviarNoAutorizado = (error) =>
      res.status(401).send({ status: "error", error });

    // Envía un error de recurso no encontrado
    res.enviarNoEncontrado = (error) =>
      res.status(404).send({ status: "error", error });

    next();
  };
  /**
  * Método que transforma una lista de callbacks en funciones async-safe,
  * atrapando errores y enviando respuestas de error internas automáticamente.
  */
  applyCallbacks(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        params[1].enviarErrorInterno(error);
      }
    });
  }
}
