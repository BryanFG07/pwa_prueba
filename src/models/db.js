const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'monorail.proxy.rlwy.net',
    user: 'root',
    password: 'RjOqLzMgkGkcEpOUAPacvcOQpKWkHtZW',
    database: 'railway', 
    port: 14538, 

});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a MySQL:', err);
        return;
    }
    console.log('Conexión exitosa a MySQL');
});

module.exports = connection;