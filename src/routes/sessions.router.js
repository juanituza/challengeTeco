import BaseRouter from "./baseRouter.js";


import {
  createHash,
  generateToken,
  passportCall,
  validatePassword,
} from "../utils.js";
// import { cartService, usersService } from "../dao/Mongo/Managers/index.js";
import { cartService, usersService } from "../services/repositories/index.js";

// import { cartService, usersService } from "../services/index.js";





export default class SessionRouter extends BaseRouter {
  init() {
    this.post("/register", ["PUBLIC"], passportCall("register", { strategyType: 'locals' }), async (req, res) => {
      
      res.sendSuccess('Register ok');
    });

    this.post("/login", ["PUBLIC"], passportCall("login",{ strategyType: 'locals' }), async (req, res) => {
       const accessToken = generateToken(req.user);
      //envío el token por el body para que el front lo guarde
      // res.send({ estatus: "success", accessToken })
      res
        .cookie("authToken", accessToken, {
          maxAge: 1000 * 60 * 60 * 24,
          httpOnly: true,
          sameSite: "strict",
        })
        .sendSuccess("Login In");
    });

    this.get("/github", ["NO_AUTH"], passportCall("github", { strategyType: 'locals' }), (req, res) => { });

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

    this.get("/profile", ["USER", "ADMIN"], passportCall("jwt", { strategyType: 'locals' }), async (req, res) => {
    
      res.sendSuccessWithPayload({ user: req.user });
    });

    this.post("/restorePassword", ["PUBLIC"], async (req, res) => {
      const { email, password } = req.body;
      //Verifico si existe el usuario
      // const user = await um.getUserBy({email});
      const user = await usersService.getUserBy( {email} );

      if (!user)
        return res
          .sendUnauthorized("User doesn't exist");
      //Comparo password nuevo con el antiguo
      const isSamePassword = await validatePassword(password, user.password);
      if (isSamePassword)
        return res.sendUnauthorized("Cannot replace password with current password");
      //Si es diferente actualizo password
      const newHashPassword = await createHash(password); //hasheo password nuevo
      // const result = await um.updateUser({ email }, { $set: { password:newHashPassword }});
      // const result = await userModel.updateOne(
      const result = await usersService.updateUser(
        {email} , { password: newHashPassword }
      );
      res.sendSuccess("Password updated successfully");
      // res.sendStatus(200);
    });
  }
}
