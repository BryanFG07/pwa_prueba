const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'davrod@localhost',
    password: 'Temporal1',
    database: 'riesgo'
});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a MySQL:', err);
        return;
    }
    console.log('Conexión exitosa a MySQL');
});

module.exports = connection;