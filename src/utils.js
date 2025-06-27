import config from './config.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import { dirname } from "path";
import { fileURLToPath } from "url";


export const generateToken = (user) => {
  const token = jwt.sign(user, config.jwt.SECRET, { expiresIn: "24h" });
  return token;
};

export const passportCall = (strategy, options = {}) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (error, user, info) => {
      if (error) return next(error);
      if (!options.strategyType) {
        req.error = "No strategy defined";
      } else if (!user) {
        switch (options.strategyType) {
          case "jwt":
            req.error = info.message ? info.message : info.toString();
            return next();

          case "locals":
            return res.sendUnauthorized(
              info.message ? info.message : info.toString()
            );
            
          case "github":
            req.error = info
              ? info.message
                ? info.message
                : info.toString()
              : "Authentication failed";
            break;
        }
      }
      req.user = user;
      next();
    })(req, res, next);
  };
};


// export const cookieExtractor = (req) => {
//   let token = null;
//   if (req && req.cookies) {
//     token = req.cookies["authToken"];
//   }
//   return token;
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

