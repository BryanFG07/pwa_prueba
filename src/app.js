//Importación de modulos
const express = require('express');
const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const session = require('express-session');
const bodyParser = require('body-parser');

//Configurar aplicacion express
const app = express();
app.set('port', 8000);


//Configurar archivos estaticos (js, img, css) 
app.use(express.static(__dirname + '/public'));

//Configurcion para solicitudes configuradas url
app.use(bodyParser.urlencoded({
    extended: true
}));
//Configuracion para solicitudes JSON
app.use(bodyParser.json());

//Manejo archivos de solicitudes
const formularioRiesgoRouter = require('./controllers/formularioRiesgo');
app.use('/', formularioRiesgoRouter);


//Poner a la escucha el servidor
app.listen(app.get('port'), () => {
    console.log('Escuchando el puerto ', app.get('port'));
});
