import { Router } from "express";
import passport from "passport";
import userManager from "../dao/Managers/Mongo/userManager.js";
import {
  createHash,
  generateToken,
  passportCall,
  validatePassword,
} from "../utils.js";
import userModel from "../dao/Mongo/models/user.js";

const router = Router();
const um = new userManager();

router.post("/register", passportCall("register"), async (req, res) => {
  res.sendStatus(200);
});

router.post("/login", passportCall("login"), async (req, res) => {
  // console.log(req.user);
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
    .sendStatus(200);
});

router.get("/github", passportCall("github"), (req, res) => {});

router.get("/githubcallback", passportCall("github"), (req, res) => {
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
    .sendStatus(200);

  res.send({ estatus: "success", message: "Logueado con github" });
});

router.get("/profile", passportCall("profile"), async (req, res) => {
  res.send({ status: "success", user: req.user });
});

router.post("/restorePassword", async (req, res) => {
  const { email, password } = req.body;
  //Verifico si existe el usuario
  // const user = await um.getUserBy({email});
  const user = await userModel.findOne({ email });

  if (!user)
    return res
      .status(400)
      .send({ status: "error", error: "User doesn't exist" });
  //Comparo password nuevo con el antiguo
  const isSamePassword = await validatePassword(password, user.password);
  if (isSamePassword)
    return res
      .status(400)
      .send({
        status: "error",
        error: "Cannot replace password with current password",
      });
  //Si es diferente actualizo password
  const newHashPassword = await createHash(password); //hasheo password nuevo
  // const result = await um.updateUser({ email }, { $set: { password:newHashPassword }});
  const result = await userModel.updateOne(
    { email },
    { $set: { password: newHashPassword } }
  );
  console.log(result);

  res.sendStatus(200);
});

export default router;
