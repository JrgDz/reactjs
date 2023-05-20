'use strict'

//Cargar módulos de node para crear servidor
var express = require('express');
var bodyParser = require('body-parser');

//Ejecutar express (http)
var app = express();

//Cargar ficheros de rutas
var routeArticle = require('./routes/routeArticle');

//Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CORS
app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
   res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
   next();
});


//Añadir prefijos a las rutas / Cargar rutas
app.use('/api/', routeArticle)

//Ruta de prueba para comprobar funcionamiento de la API
/*
app.post('/prueba',(req, res)=>{
   //console.log("Hola Mundo")
   var saludo = req.body.hola;
   return res.status(200).send({
      curso:"NodeJS",
      alumno:"Jorge Díaz",
      url:"jrgdz.com.ec",
      saludo
   })
})
*/

//Exportar el módulo actual
module.exports = app;