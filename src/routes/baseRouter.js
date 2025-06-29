import { Router } from "express";
import { llamarPasaporte } from "../utils.js";


export default class BaseRouter {
  constructor() {
    this.router = Router();
    this.init();
  }

  getRouter() {
    return this.router;
  }

  init() {}

  get(path, permisos, ...callbacks) {
    this.router.get(
      path,
      
      llamarPasaporte("jwt", { strategyType: "jwt" }),
      this.verificarPermisos(permisos),
      this.generarRespuestasPersonalizadas,
      this.applyCallbacks(callbacks)
    );
  }

  post(path, permisos, ...callbacks) {
    this.router.post(
      path,
      llamarPasaporte("jwt", { strategyType: "jwt" }),
      this.verificarPermisos(permisos),
      this.generarRespuestasPersonalizadas,
      this.applyCallbacks(callbacks)
    );
  }

  put(path, permisos, ...callbacks) {
    this.router.put(
      path,
      llamarPasaporte("jwt", { strategyType: "jwt" }),
      this.verificarPermisos(permisos),
      this.generarRespuestasPersonalizadas,
      this.applyCallbacks(callbacks)
    );
  }

  delete(path, permisos, ...callbacks) {
    this.router.delete(
      path,
      llamarPasaporte("jwt", { strategyType: "jwt" }),
      this.verificarPermisos(permisos),
      this.generarRespuestasPersonalizadas,
      this.applyCallbacks(callbacks)
    );
  }

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

  
 verificarPermisos = (permisos) => {
  return (req, res, next) => {
    if (permisos[0] === "PUBLIC") return next();

    const usuario = req.user;

    // Si la política es NO_AUTH y el usuario ya está autenticado
    if (permisos[0] === "NO_AUTH" && usuario)
      return res.status(401).send({ status: "error", error: "No autorizado (ya autenticado)" });

    if (permisos[0] === "NO_AUTH" && !usuario) return next();

    // Si requiere autenticación pero no hay usuario
    if (!usuario)
      return res.status(401).send({ status: "error", error: "No autenticado" });

    // Validación de rol
    const rol = usuario.role?.toUpperCase?.();
    if (!rol || !permisos.includes(rol))
      return res.status(403).send({ status: "error", error: "Acceso denegado (rol inválido)" });

    next();
  };
};


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
