import BaseRouter from "./baseRouter.js";

import userController from "../controllers/user.controller.js";
import {passportCall} from "../utils.js";
import upload from "../middlewares/uploader.js";
// const router = Router();

export default class UserRouter extends BaseRouter{
  init(){

    this.get("/", ["USER", "ADMIN"], passportCall("jwt", { strategyType: 'locals' }),userController.getUsers);
    this.post("/", ["USER", "ADMIN"], passportCall("jwt", { strategyType: 'locals' }), userController.saveUsers);
    this.put("/role", ["USER","PREMIUM", "ADMIN"], passportCall("jwt", { strategyType: 'locals' }), userController.modificateRole );
    this.put(
      "/premium/:uid",
      ["USER", "PREMIUM", "ADMIN"],
      passportCall("jwt", { strategyType: "locals" }),
      userController.modificateRole
      );
      this.put("/:uid", ["USER", "ADMIN"], passportCall("jwt", { strategyType: 'locals' }), userController.editUsers );
      this.delete("/:uid", ["USER", "ADMIN"], passportCall("jwt", { strategyType: 'locals' }), userController.deleteUsers);



      this.post(
        "/:uid/documents",
        ["USER"],
        passportCall("jwt", { strategyType: "locals" }),upload.any(),userController.uploadFiles);

      
      
  }
}

