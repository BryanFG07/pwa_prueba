const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'viaduct.proxy.rlwy.net',
    user: 'root',
    password: 'XvSZOmnXWtLUhctrBVgpflhfQENicRiV',
    database: 'railway', 
    port: 22522, 

});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a MySQL:', err);
        return;
    }
    console.log('Conexión exitosa a MySQL');
});

module.exports = connection;