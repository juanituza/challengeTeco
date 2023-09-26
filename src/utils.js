import fs from 'fs';
import config from './config.js';
import Handlebars from 'handlebars';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import UserDTO from "./dto/UserDTO.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

import LoggerService from "./dao/Mongo/Managers/LoggerManager.js";

export const generateToken = (user) => {
  const token = jwt.sign(user, config.jwt.SECRET, { expiresIn: "24h" });
  return token;
};

export const passportCall = (strategy, options = {}) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (error, user, info) => {
      if (error) return next(error);
      if (!options.strategyType) {
        console.log(`Route ${req.url} doesn't have defined a strategy`);
        req.error = "No strategy defined";
      } else if (!user) {
        switch (options.strategyType) {
          case "jwt":
            req.error = info.message ? info.message : info.toString();
            return next();

          case "locals":
            return res.sendUnauthorized(
              info.message ? info.message : info.toString()
              // LoggerService.info("User exist")
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


export const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["authToken"];
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

export const generateMailTemplate= async (template,payload) => {
  const content = await fs.promises.readFile(`${__dirname}/templates/${template}.handlebars`,'utf-8')
  const precompiledContent = Handlebars.compile(content);
  const compileContent = precompiledContent({...payload});
  return compileContent;
} 

export default __dirname;

