import BaseRouter from "./baseRouter.js";
import {
  createHash,
  generateToken,
  passportCall,
  validatePassword,
} from "../utils.js";
import { usersService } from "../services/repositories/index.js";
import sessionsController from "../controllers/sessionsController.js";
export default class SessionRouter extends BaseRouter {
  init() {
    this.post(
      "/register",
      ["PUBLIC"],
      passportCall("register", { strategyType: "locals" }),
      sessionsController.register
    );

    this.post(
      "/login",
      ["PUBLIC"],
      passportCall("login", { strategyType: "locals" }),
      sessionsController.login
    );

    this.get(
      "/github",
      ["NO_AUTH"],
      passportCall("github", { strategyType: "locals" }),
      (req, res) => {}
    );

    this.get(
      "/githubcallback",
      ["NO_AUTH"],
      passportCall("github", { strategyType: "locals" }),
      sessionsController.loginGitHub
    );

    this.post(
      "/logout",
      ["USER", "PREMIUM", "ADMIN"],
      passportCall("jwt", { strategyType: "locals" }),
      async (req, res) => {
        res.clearCookie("authToken"); // Eliminar la cookie "authToken"
        res.send({
          status: "success",
          message: "Sesión cerrada correctamente",
        });
      }
    );
    this.post("/restorePassword", ["PUBLIC"], async (req, res) => {
      const { email, password } = req.body;
      //Verifico si existe el usuario
      // const user = await um.getUserBy({email});
      const user = await usersService.getUserBy({ email });

      if (!user) return res.sendUnauthorized("User doesn't exist");
      //Comparo password nuevo con el antiguo
      const isSamePassword = await validatePassword(password, user.password);
      if (isSamePassword)
        return res.sendUnauthorized(
          "Cannot replace password with current password"
        );
      //Si es diferente actualizo password
      const newHashPassword = await createHash(password); //hasheo password nuevo
      // const result = await um.updateUser({ email }, { $set: { password:newHashPassword }});
      // const result = await userModel.updateOne(
      const result = await usersService.updateUser(
        { email },
        { password: newHashPassword }
      );
      res.sendSuccess("Password updated successfully");
      // res.sendStatus(200);
    });
  }
}
