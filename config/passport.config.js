import passport from "passport";
import config from "../src/config.js";
import local from "passport-local";
import {
  servicioUsuarios
} from "../src/services/repositorios/index.js";
// import { Strategy, ExtractJwt } from "passport-jwt";
import { jwtExtractor, createHash, validatePassword } from "../src/utils.js";

import LoggerService from "../src/dao/MySql/Managers/LoggerManager.js";

import { Strategy as JWTStrategy } from "passport-jwt";




const LocalStrategy = local.Strategy;

const initializePassportStrategies = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, email, password, done) => {
        try {
          const { nombre, role } = req.body;
          const exist = await servicioUsuarios.obtenerUsuarioPor({ email });
          // const exist = await userModel.findOne({ email });

          if (exist) return done(null, false, { message: "User exist" }, LoggerService.error("User exist"));
          // done(null, false, { message: "User exist" },LoggerService.error("Role not exist"));
          const hashedPassword = await createHash(password);
          const user = {
            nombre,
            email,
            password: hashedPassword,
            role,
          };

          // const result = await userModel.create(user);
          const result = await servicioUsuarios.crearUsuario(user);
          done(null, result);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        //defino el admin
        if (email === config.admin.USER && password === config.admin.PASS) {
          const User = {
            id: 0,
            name: `ADMIN`,
            role: "ADMIN",
            email: config.admin.USER,
          }; 
          return done(null, User);
        }
        let user;
        user = await servicioUsuarios.obtenerUsuarioPor({ email });
        if (!user)
          return done(null, false, { message: "Incorrect credentials" });

        const isValidPassword = await validatePassword(password, user.password);

        if (!isValidPassword)
          return done(null, false, { message: "Wrong password" });


        //creo la sesión

        user = {
          _id: user._id,
          nombre: user.nombre,
          email: user.email,
          role: user.role,
          status: user.status,
        };



        return done(null, user);
      }
    )
  );





passport.use(
  "jwt",
  new JWTStrategy(
    {
      jwtFromRequest: jwtExtractor,
      secretOrKey: config.jwt.SECRET,
    },
    async (payload, done) => {
      try {
        return done(null, payload);
      } catch (error) {
        done(error);
      }
    }
  )
);

};

export default initializePassportStrategies;
