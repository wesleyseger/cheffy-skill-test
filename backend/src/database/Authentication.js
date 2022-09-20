import connect from '../config/database.js'

async function getHashPassword(username) {
  const conn = await connect();
  const sql = 'SELECT * FROM users WHERE username = ?';
  const values = [username]
  let [result] = await conn.query(sql, values)
  return result[0].password;
}

async function createNewUser(name, username, password) {
  const conn = await connect();
  const sql = 'INSERT INTO users (name, username, password) VALUES (?, ?, ?)';
  const values = [name, username, password]
  let [result] = await conn.query(sql, values)
  return result.insertId;
}

async function getUser(username) {
  const conn = await connect();
  const sql = 'SELECT name, username FROM users WHERE username = ?';
  const values = [username]
  let [result] = await conn.query(sql, values)
  return result[0]
}

async function getTokenByUser(username) {
  const conn = await connect();
  const sql = 'SELECT token FROM users WHERE username = ?';
  const values = [username]
  let [result] = await conn.query(sql, values)
  return result[0].token;
}

async function insertToken(username, token) {
  const conn = await connect();
  const sql = 'UPDATE users SET TOKEN = ? WHERE username = ?;';
  const values = [token, username]
  let [result] = await conn.query(sql, values)
  return result[0]
}

async function deleteToken(username) {
  const conn = await connect();
  const sql = 'UPDATE users SET token = NULL WHERE username = ?';
  const values = [username]
  let [result] = await conn.query(sql, values)
  return result[0]
}

async function getUserByToken(token) {
  const conn = await connect();
  const sql = 'SELECT username FROM users WHERE token = ?';
  const values = [token]
  let [result] = await conn.query(sql, values)
  return result[0]
}

async function updatePassword(token, password) {
  const conn = await connect();
  const sql = 'UPDATE users SET password = ? WHERE token = ?';
  const values = [password, token]
  let [result] = await conn.query(sql, values)
  return result[0];
}

export { getHashPassword, createNewUser, getUser, getTokenByUser, deleteToken, insertToken, updatePassword, getUserByToken };