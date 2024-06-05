const express = require('express');
const router = express.Router();
const connection = require('../models/db');

// Manejamos la solicitud del registro
router.post('/registrar', (req, res) => {
    const { folio_planta, fecha_relleno, litros, causa, nota } = req.body;
    const query = "INSERT INTO pruebanodejs (folio_planta, fecha_relleno, litros, causa, nota) VALUES (?,?,?,?,?) ";
    const values = [folio_planta, fecha_relleno, litros, causa, nota];
    connection.query(query, values, (error, results) => {
        if (error) {
            console.log('Error al insertar registro', error);
            res.send('Error al insertar registro');
            return;
        }
        console.log('Registro guardado con éxito');
        res.send('Registro guardado con éxito');
    });
});

module.exports = router;