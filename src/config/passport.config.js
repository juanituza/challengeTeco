import passport from "passport";
import config from "../config.js";
import local from "passport-local";
import {
  servicioUsuarios
} from "../services/repositorios/index.js";
// import { Strategy, ExtractJwt } from "passport-jwt";
import { jwtExtractor, createHash, validatePassword } from "../utils.js";

import LoggerService from "../dao/MySql/Managers/LoggerManager.js";

import { Strategy as JWTStrategy } from "passport-jwt";




const LocalStrategy = local.Strategy;

const initializePassportStrategies = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, email, password, done) => {
        try {
          const { nombre , rol } = req.body;
          const exist = await servicioUsuarios.obtenerUsuarioPor({ email  });
          // const exist = await userModel.findOne({ email });

          if (exist) return done(null, false, { message: "User exist" }, LoggerService.error("User exist"));
          // done(null, false, { message: "User exist" },LoggerService.error("Role not exist"));
          const hashedPassword = await createHash(password);
          const user = {
            nombre,
            email,
            password: hashedPassword,
            rol: rol || 'VIEWER', // Default role if not provided   
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
            rol: "ADMIN",
            email: config.admin.USER,
          }; 
          return done(null, User);
        }
        let user;
        user = await servicioUsuarios.obtenerUsuarioPor({ email });
        if (!user)
          return done(null, false, { message: "Credenciales incorrectas" });

        const isValidPassword = await validatePassword(password, user.password);

        if (!isValidPassword)
          return done(null, false, { message: "Password incorrecto" });


        //creo la sesión

        user = {
          id: user.id,
          nombre: user.nombre,
          email: user.email,
          rol: user.rol  ,
         
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
