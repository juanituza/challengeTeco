import dotenv from 'dotenv';
import { Command } from 'commander';


// Definimos una opción de línea de comandos: --mode <mode>
// Esto nos permite elegir entre modo "dev" o "prod"
const program = new Command();
program.option('-m, --mode <mode>', 'Modo de ejecución', 'dev');
// Procesamos los argumentos recibidos desde la línea de comandos
program.parse();

// Configuramos dotenv para cargar variables de entorno según el modo
// Si el modo es "dev", carga desde .env.dev; si es "prod", desde .env.prod
dotenv.config({
    path:program.opts().mode==="dev"?'./.env.dev':'./.env.prod'
});

// Exportamos un objeto con todas las variables de configuración centralizadas
export default {
   // Configuración de la aplicación (puerto del servidor)
  app: {
    PORT: process.env.PORT || 8080,
  },
  // Configuración de conexión a la base de datos MySQL
  connection: {
    HOST: process.env.HOST || "localhost:3306",
    PORT: process.env.MYSQL_PORT || 3306,
    DATABASE: process.env.DATABASE,
    USER: process.env.DB_USER,
    PASS: process.env.DB_PASSWORD,
  },
  // Credenciales del administrador hardcodeado (para login directo como admin)
  admin: {
    USER: process.env.ADMIN_EMAIL,
    PASS: process.env.ADMIN_PWD,
  },
    // Configuración del token JWT
  jwt:{
    COOKIE: process.env.JWT_COOKIE,
    SECRET: process.env.JWT_SECRET
  },
};