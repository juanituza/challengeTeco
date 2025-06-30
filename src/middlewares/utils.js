import config from '../config.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import { dirname } from "path";
import { fileURLToPath } from "url";

//Generador de token JWT
export const generarToken = (user) => {
  // Crea el token con una validez de 24 horas usando la clave secreta definida en la configuración
  const token = jwt.sign(user, config.jwt.SECRET, { expiresIn: "24h" });
  return token;
};
//Middleware para ejecutar una estrategia de autenticación de Passport.
export const llamarPasaporte = (strategy, options = {}) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (error, user, info) => {
      // Si ocurre un error durante la autenticación, lo pasamos al siguiente middleware
      if (error) return next(error);
      // Verificamos que se haya definido el tipo de estrategia
      if (!options.strategyType) {
        req.error = "Estrategia no definida";
      }
      // Si no se autenticó ningún usuario 
      else if (!user) {
        switch (options.strategyType) {
          // Si es una estrategia JWT, pasamos el error al siguiente middleware
          case "jwt":
            req.error = info?.message || info?.toString();
            return next();
           // Si es una estrategia local, enviamos una respuesta no autorizada
          case "locals":
            return res.enviarNoAutorizado(info?.message || info?.toString());
        }
      }
      
      // Si la autenticación fue exitosa, guardamos el usuario en la request
      req.user = user;
      next();
    })
    // Ejecutamos la función de authenticate de Passport
    (req, res, next);
  };
};

//Middleware para verificar permisos de acceso según el rol del usuario o el tipo de acceso.
export const verificarPermisos = (permisos = []) => {
  return (req, res, next) => {
    // Validación inicial: el parámetro debe ser un array
    if (!Array.isArray(permisos)) {
      return res.status(500).json({
        status: "error",
        error: "Error interno: permisos no es un array",
      });
    }
    // Si el permiso es público, se permite el acceso sin restricciones
    if (permisos.includes("PUBLIC")) return next();

    const usuario = req.user;
    // Si se requiere que el usuario NO esté autenticado, pero sí lo está => error
    if (permisos.includes("NO_AUTH") && usuario)
      return res.status(401).json({ status: "error", error: "No autorizado (ya autenticado)" });
    // Si se requiere que el usuario NO esté autenticado y efectivamente no lo está => permitir
    if (permisos.includes("NO_AUTH") && !usuario) return next();
    // Si el usuario no está autenticado y se requieren permisos => denegar acceso
    if (!usuario)
      return res.status(401).json({ status: "error", error: "No autenticado" });
    // Se normaliza el rol del usuario a mayúsculas
    const rol = usuario.rol?.toUpperCase?.();
    // Si no tiene rol o su rol no está en la lista de permisos => denegar acceso
    if (!rol || !permisos.map(p => p.toUpperCase()).includes(rol)) {
      return res.status(403).json({ status: "error", error: "Acceso denegado (rol inválido)" });
    }
    // Si pasó todas las validaciones, se permite el acceso
    next();
  };
};

//Middleware que extrae el token JWT desde la cookie o desde el encabezado Authorization.
export const extraerTokenJwt = (req) => {
  let token = null;

  // Intentamos extraer desde cookie
  if (req && req.cookies && req.cookies["authToken"]) {
    token = req.cookies["authToken"];
  }

  // Si no está en la cookie, buscamos en Authorization header
  if (!token && req && req.headers && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    // Verificamos que el encabezado comience con "Bearer "
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7); // elimina "Bearer "
    }
  }
  // Retornamos el token encontrado, o null si no se encontró en ninguna parte
  return token;
};







export const createHash = async (password) => {
  //Generar los salts
  const salts = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salts);
};

export const validadContraseña = (password, hashedPassword) =>
  bcrypt.compare(password, hashedPassword);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



export default __dirname;

