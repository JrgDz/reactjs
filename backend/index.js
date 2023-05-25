'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3900;

//mongoose.set('useFindAndModify', false); //DEPRECATED
mongoose.set('strictQuery', false); //DEPRECATED
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://127.0.0.1:27017/api_rest_blog', {useNewUrlParser:true})
mongoose.connect('mongodb+srv://mongouser:iBHfLfewWGnkZzf9@cluster0.wsocsa9.mongodb.net/api-rest-blog?retryWrites=true&w=majority', {useNewUrlParser:true})
        .then(()=>{
            console.log('La conexión a MongoDB se ha realizado con éxito!!!')
            
            //Crear servidor y escuchar peticiones HTTP
            app.listen(port, ()=>{
            //    console.log('Servidor corriendo en http://localhost:' + port)
               console.log('Servidor corriendo en ATLAS')
            })
        });

