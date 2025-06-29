import config from './config.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import { dirname } from "path";
import { fileURLToPath } from "url";

//Generador de token JWT
export const generarToken = (user) => {
  const token = jwt.sign(user, config.jwt.SECRET, { expiresIn: "24h" });
  return token;
};

export const llamarPasaporte = (strategy, options = {}) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (error, user, info) => {
      if (error) return next(error);

      if (!options.strategyType) {
        req.error = "Estrategia no definida";
      } else if (!user) {
        switch (options.strategyType) {
          case "jwt":
            req.error = info?.message || info?.toString();
            return next();

          case "locals":
            return res.enviarNoAutorizado(info?.message || info?.toString());
        }
      }

      req.user = user;
      next();
    })(req, res, next);
  };
};





// export const onlyGuests = (req, res, next) => {
//   const token = jwtExtractor(req);
//   if (!token) return next();

//   try {
//     jwt.verify(token, config.jwt.SECRET);
//     return res.status(403).json({
//       status: "error",
//       message: "Ya estás autenticado. No podés acceder a esta ruta.",
//     });
//   } catch (err) {
//     next(); // Token inválido o expirado, dejá pasar
//   }
// };


export const jwtExtractor = (req) => {
  let token = null;

  // Intentamos extraer desde cookie
  if (req && req.cookies && req.cookies["authToken"]) {
    token = req.cookies["authToken"];
  }

  // Si no está en la cookie, buscamos en Authorization header
  if (!token && req && req.headers && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7); // elimina "Bearer "
    }
  }

  return token;
};







export const createHash = async (password) => {
  //Generar los salts
  const salts = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salts);
};

export const validatePassword = (password, hashedPassword) =>
  bcrypt.compare(password, hashedPassword);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



export default __dirname;

