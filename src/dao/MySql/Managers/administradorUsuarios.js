
import pool from '../connection.js';

export default class administradorUsuarios {
  async obtenerUsuarios() {
    const [rows] = await pool.query("SELECT * FROM usuarios");
    return rows;
  }

  async obtenerUsuarioPorId(id) {
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [id]);
    return rows[0];
  }

  async obtenerUsuarioPor(params) {
    const keys = Object.keys(params);
    const values = Object.values(params);

    const query = `SELECT * FROM usuarios WHERE ${keys.map(k => `${k} = ?`).join(" AND ")}`;
    const [rows] = await pool.query(query, values);
    return rows[0];
  }

  async crearUsuario(user) {
   // Insertar usuario
  await pool.query("INSERT INTO usuarios SET ?", user);

  // Obtener usuario completo con valores por defecto (como rol)
  const [rows] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [user.email]);
   
    
  return rows[0];
  }

  async editarUsuario(id, updatedFields) {
    const keys = Object.keys(updatedFields);
    const values = Object.values(updatedFields);

    const setClause = keys.map(k => `${k} = ?`).join(", ");
    const [result] = await pool.query(
      `UPDATE usuarios SET ${setClause} WHERE id = ?`,
      [...values, id]
    );
    return result;
  }

  async deleteUser(id) {
    const [result] = await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);
    return result;
  }
}
