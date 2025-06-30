
import pool from '../connection.js';

/**
 * Clase encargada de manejar todas las operaciones relacionadas con los usuarios
 * en la base de datos MySQL. Utiliza el pool de conexiones para ejecutar consultas.
 */
export default class administradorUsuarios {
  //Obtiene todos los usuarios registrados en la base de datos.
  async obtenerUsuarios() {
    const [rows] = await pool.query("SELECT * FROM usuarios");
    return rows;
  }
  //Obtiene un usuario por su ID.
  async obtenerUsuarioPorId(id) {
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [id]);
    return rows[0];
  }
  //Obtiene un usuario por un parametro
  async obtenerUsuarioPor(params) {
    const keys = Object.keys(params);
    const values = Object.values(params);

    const query = `SELECT * FROM usuarios WHERE ${keys.map(k => `${k} = ?`).join(" AND ")}`;
    const [rows] = await pool.query(query, values);
    return rows[0];
  }
  //Crea un usuario.
  async crearUsuario(user) {
    // Insertar usuario
    await pool.query("INSERT INTO usuarios SET ?", user);

    // Obtener usuario completo con valores por defecto (como rol)
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [user.email]);


    return rows[0];
  }
  //Modifica un usuario encontrado por ID especifico
  async editarUsuario(id, datoModificado) {
    const keys = Object.keys(datoModificado);
    const values = Object.values(datoModificado);

    const setClause = keys.map(k => `${k} = ?`).join(", ");
    const [result] = await pool.query(
      `UPDATE usuarios SET ${setClause} WHERE id = ?`,
      [...values, id]
    );
    return result;
  }
  //Elmimina un usuario encontrado por un ID
  async eliminarUsuario(id) {
    const [result] = await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);
    return result;
  }
}
