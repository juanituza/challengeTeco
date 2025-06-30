import administradorUsuarios from "../../dao/MySql/Managers/administradorUsuarios.js";
import UsuariosRepositorios from "./UsuariosRepositorios.js";


// Importamos el repositorio que actúa como capa intermedia entre la lógica de negocio y el DAO
export const servicioUsuarios = new UsuariosRepositorios(new administradorUsuarios());



