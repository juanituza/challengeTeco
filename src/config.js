import dotenv from 'dotenv';
import { Command } from 'commander';


const program = new Command();
program.option('-m, --mode <mode>', 'Modo de ejecución', 'dev');
program.parse();




dotenv.config({
    path:program.opts().mode==="dev"?'./.env.dev':'./.env.prod'
});


export default {
  app: {
    PORT: process.env.PORT || 8080,
  },
  connection: {
    HOST: process.env.HOST || "localhost:3306",
    PORT: process.env.MYSQL_PORT || 3306,
    DATABASE: process.env.DATABASE,
    USER: process.env.DB_USER,
    PASS: process.env.DB_PASSWORD,
  },
  admin: {
    USER: process.env.ADMIN_EMAIL,
    PASS: process.env.ADMIN_PWD,
  },
  // mailer: {
  //   USER: process.env.MAILER_USER,
  //   PASS: process.env.MAILER_PASSWORD,
  // },
  jwt:{
    COOKIE: process.env.JWT_COOKIE,
    SECRET: process.env.JWT_SECRET
  },
};