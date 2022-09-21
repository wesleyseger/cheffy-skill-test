import mysql from 'mysql2/promise';

const database = {
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.PASS,
  database: process.env.DBNAME
}

async function connect() {
  if (global.connection && global.connection.state !== 'disconnected')
    return global.connection;

  const connection = await mysql.createConnection(database);
  console.log(`Connection sucessfully on DB ${database.database}`);
  global.connection = connection;
  return connection;
}

connect();

export default connect;