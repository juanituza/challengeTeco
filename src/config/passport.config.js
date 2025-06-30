import passport from "passport";
import config from "../config.js";
import local from "passport-local";
import {servicioUsuarios} from "../services/repositorios/index.js";
import { extraerTokenJwt, createHash, validadContraseña } from ".././middlewares/utils.js";
import LoggerService from "../dao/MySql/Managers/LoggerManager.js";
import { Strategy as JWTStrategy } from "passport-jwt";

//Creo las estrategias para el registro, el acceso y el token a traves de JWT
const LocalStrategy = local.Strategy;
//Funcion para la creacion de estrategias
const initializePassportStrategies = () => {
  //Registro de usuarios
  passport.use(
    "registro",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, email, password, done) => {
        try {
          //Capturo el nombre y el rol del body
          const { nombre , rol } = req.body;
          //Verifico si existe ese mail en los usuarios
          const exist = await servicioUsuarios.obtenerUsuarioPor({ email  });
          //Si existe devielvo un error con mensaje
          if (exist) return done(null, false, { message: "Existe un usuario con ese mail" }, LoggerService.error("Existe un usuario con ese mail"));
          // Si no existe creo el usuario y encripto la constraseña
          const hashedPassword = await createHash(password);
          const user = {
            nombre,
            email,
            password: hashedPassword,
            rol: rol || 'VIEWER', 
          };
          //Con ese usuario lo creo en la BD a traves de mi servicio
          const result = await servicioUsuarios.crearUsuario(user);
          done(null, result);
        } catch (error) {
          done(error);
        }
      }
    )
  );
  //Estrategia para el logueo
  passport.use(
    "acceso",
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        //defino el admin y lo asigno a la constante Usuario
        if (email === config.admin.USER && password === config.admin.PASS) {
          //defino el admin por defecto con un email por variable de entorno.
          const usuario = {
            id: 0,
            nombre: `ADMIN`,
            rol: "ADMIN",
            email: config.admin.USER,
          }; 
          return done(null, Usuario);
        }
        let usuario;
        //obtengo el usuario con su email
        usuario = await servicioUsuarios.obtenerUsuarioPor({ email });
        //Si no existe mail salgo
        if (!usuario)
          return done(null, false, { message: "Credenciales incorrectas" });
        //obtengo mail lo valido con un middleware en el archivo utils.js
        const contraseñaValida = await validadContraseña(password, usuario.password);
        //Si no existe mail valido, devuelvo error
        if (!contraseñaValida)
          return done(null, false, { message: "Contraseña incorrecta" });
        //Creo la sesión
        usuario = {
          id: usuario.id,
          nombre: usuario.nombre,
          email: usuario.email,
          rol: usuario.rol,         
        };
        //retorno usuario
        return done(null, usuario);
      }
    )
  );

// Configuración de la estrategia JWT con Passport
passport.use(
  "jwt",
  new JWTStrategy(
    {
      jwtFromRequest: extraerTokenJwt,     // Define cómo se extrae el token JWT del request
      secretOrKey: config.jwt.SECRET,   // Clave secreta para verificar el token
    },
    // Función que se ejecuta una vez que el token ha sido verificado correctamente
    async (payload, done) => {
      try {
        // Si el ID dentro del payload del token es 0, asumimos que es el usuario ADMIN hardcodeado
        if (payload.id === 0) {
          const adminUser = {
            id: 0,
            nombre: "ADMIN",
            rol: "ADMIN",
            email: config.admin.USER,
          };
          // Devolvemos el objeto del usuario admin manualmente
          return done(null, adminUser); 
        }
        // Si el usuario no es admin, buscamos al usuario en la base de datos por su ID
        const user = await servicioUsuarios.obtenerUsuarioPorId(payload.id);

        // Si no se encuentra ningún usuario con ese ID
        if (!user) {
          // No autenticado
          return done(null, false); 
        }
        // Si encontramos el usuario, lo devolvemos para que Passport lo guarde en req.user
        return done(null, user);
      } catch (error) {
        // Si ocurre un error al procesar la autenticación error durante la verificación del token
        return done(error, false); 
      }
    }
  )
);


}

export default initializePassportStrategies;
