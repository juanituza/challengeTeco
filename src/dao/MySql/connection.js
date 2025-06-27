import mysql from 'mysql2/promise';
import config from '../../config.js';

const pool = mysql.createPool({
  host: config.connection.HOST,
  user: config.connection.USER,
  password: config.connection.PASS,
  database: config.connection.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
