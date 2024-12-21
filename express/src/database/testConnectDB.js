import mysql from 'mysql2';

const db = {
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '17321852066Yjl@',
}

const pool = mysql.createPool(db);

const promisePool = pool.promise();

async function testConnectDB() {
  try {
    const [rows, fields] = await promisePool.query('SELECT 1');
    console.log('Rows: ', rows);
    console.log('Connect to database successfully');
  } catch (err) {
    console.error('Error connecting to database: ', err);
  }
}

await testConnectDB();

pool.end();
