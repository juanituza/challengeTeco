


export default class UsersRepository {
  //Constructor de la clase 
  constructor(dao) {
    this.dao = dao;
  }
  //Obtiene la lista de todos los usuarios.
  obtenerUsuarios = () => {
    return this.dao.obtenerUsuarios();
  };
  //Obtiene un usuario por id.
  obtenerUsuarioPorId = (id) => {
    return this.dao.obtenerUsuarioPorId(id);
  };
  //Busca un usuario en base a parámetros dinámicos (por ejemplo, por email o nombre).
  obtenerUsuarioPor = (params) => {
    return this.dao.obtenerUsuarioPor(params);
  };
  //Crea un usuario
  crearUsuario = (user) => {
    return this.dao.crearUsuario(user);
  };
  //Edita los datos de un usuario identificado por su email.
  editarUsuario = (email, datoModificado) => {
    return this.dao.editarUsuario(email, datoModificado);
  };
  //Elimina un usuario por su id
  eliminarUsuario = (id) => {
    return this.dao.eliminarUsuario(id);
  };
}
