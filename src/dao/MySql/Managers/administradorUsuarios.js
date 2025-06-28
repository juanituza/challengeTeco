
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
    const { nombre, email, password, rol = 'viewer' } = user;
    console.log(user);
    
    const [result] = await pool.query(
      "INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)",
      [nombre, email, password, rol]
    );
    return { id: result.insertId, ...user };
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
