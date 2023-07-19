import { Router } from "express";
import jwt from "jsonwebtoken";
import { passportCall } from "../utils.js";

export default class BaseRouter {
  constructor() {
    this.router = Router();
    this.init();
  }

  getRouter() {
    return this.router;
  }

  init() {}

  get(path, policies, ...callbacks) {
    this.router.get(
      path,
      passportCall("jwt", { strategyType: "jwt" }),
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  post(path, policies, ...callbacks) {
    this.router.post(
      path,
      passportCall("jwt", { strategyType: "jwt" }),
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  put(path, policies, ...callbacks) {
    this.router.put(
      path,
      passportCall("jwt", { strategyType: "jwt" }),
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  delete(path, policies, ...callbacks) {
    this.router.delete(
      path,
      passportCall("jwt", { strategyType: "jwt" }),
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  generateCustomResponses = (req, res, next) => {
    res.sendSuccess = (message) => res.send({ status: "success", message });
    res.sendSuccessWithPayload = (payload) =>
      res.send({ status: "success", payload });
    res.sendInternalError = (error) =>
      res.status(500).send({ status: "error", error });
    res.sendErrorWithPayload = (payload) =>
      res.status(400)({ estatus: "error", payload });  
    res.sendUnauthorized = (error) =>
      res.status(400).send({ status: "error", error });
    res.sendNotFound = (error) => res.status(404)
      .send({status: "error", error});
    next();
  };

  // handlePolicies = policies => {
  //     return (req,res,next)=>{
  //       if (policies[0]==='PUBLIC') return next();
  //       const authHeaders = req.headers.authorization;
  //       if(!authHeaders) return res.status(401).send({status :"error", error:"Unauthorized"});
  //       const token = authHeaders.split(" ")[1];
  //       const user = jwt.verify(token, 'tokenSecret');
  //       //Ya tengo el usuario
  //       //Si no está incluido el rol del usuario
  //       if (!policies.includes(user.role.toUpperCase())) return res.status(403).send({ status: "error", error:"Forbidden"});
  //       req.user =user;
  //       next();
  //     }
  // }

  handlePolicies = (policies) => {
    return (req, res, next) => {
      if (policies[0] === "PUBLIC") return next();
      //Usuario parseado desde jwt
      const user = req.user;
      if (policies[0] === "NO_AUTH" && user)
        return res.status(401).send({ status: "error", error: "Unauthorized" });
      if (policies[0] === "NO_AUTH" && !user) return next();
      //Si existe un usuario.
      if (!user)
        return res.status(401).send({ status: "error", error: req.error });
      if (!policies.includes(user.role.toUpperCase()))
        return res.status(403).send({ status: "error", error: "Forbidden" });
      next();
    };
  };

  applyCallbacks(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        params[1].sendInternalError(error);
      }
    });
  }
}
