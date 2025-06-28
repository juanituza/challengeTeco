import administradorUsuarios from "../../dao/MySql/Managers/administradorUsuarios.js";
import UsuariosRepositorios from "./UsuariosRepositorios.js";



export const servicioUsuarios = new UsuariosRepositorios(new administradorUsuarios());



