import BaseRouter from "./baseRouter.js";


import {
  createHash,
  generateToken,
  passportCall,
  validatePassword,
} from "../utils.js";
import { usersService } from "../dao/Managers/Mongo/index.js";
import userModel from "../dao/Mongo/models/user.js";
import UserRouter from "./users.router.js";



export default class SessionRouter extends BaseRouter {
  init() {
    this.post("/register", passportCall("register"), async (req, res) => {
      res.sendSuccess('Register ok');
    });

    this.post("/login", passportCall("login"), async (req, res) => {
      // console.log(req.user);
      // const user = {
      //   id: req.user.id,
      //   name: req.user.name,
      //   email: req.user.email,
      //   role: req.user.role,
      // };
      const accessToken = generateToken(req.user);
      //envío el token por el body para que el front lo guarde
      // res.send({ estatus: "success", accessToken })
      res
        .cookie("authToken", accessToken, {
          maxAge: 1000 * 60 * 60 * 24,
          httpOnly: true,
          sameSite: "strict",
        })
        .sendSuccess("Login OK");
    });

    this.get("/github", passportCall("github"), (req, res) => { });

    this.get("/githubcallback", passportCall("github"), (req, res) => {
      const user = {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      };
      const accessToken = generateToken(user);
      //envío el token por el body para que el front lo guarde
      // res.send({ estatus: "success", accessToken })
      res
        .cookie("authToken", accessToken, {
          maxAge: 1000 * 60 * 60 * 24,
          httpOnly: true,
          sameSite: "strict",
        })
        .sendSuccess("Logueado con github");
    });

    this.get("/profile", passportCall("profile"), async (req, res) => {
      res.sendSuccessWithPayload({ user: req.user });
    });

    this.post("/restorePassword", async (req, res) => {
      const { email, password } = req.body;
      //Verifico si existe el usuario
      // const user = await um.getUserBy({email});
      const user = await usersService.getUserBy({ email });

      if (!user)
        return res
          .status(400)
          .send({ status: "error", error: "User doesn't exist" });
      //Comparo password nuevo con el antiguo
      const isSamePassword = await validatePassword(password, user.password);
      if (isSamePassword)
        return res.status(400).send({
          status: "error",
          error: "Cannot replace password with current password",
        });
      //Si es diferente actualizo password
      const newHashPassword = await createHash(password); //hasheo password nuevo
      // const result = await um.updateUser({ email }, { $set: { password:newHashPassword }});
      // const result = await userModel.updateOne(
      const result = await usersService.updateUser(
        {email} , { password: newHashPassword }
      );
      console.log(result);
      res.sendSuccessWithPayload({ result });
      // res.sendStatus(200);
    });
  }
}
