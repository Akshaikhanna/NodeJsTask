const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }

  console.log('Connected to the MySQL server');

  const createDatabaseQuery = 'CREATE DATABASE Book';

  connection.query(createDatabaseQuery, (err) => {
    if (err) throw err;
    console.log('Database created');
  });
});
