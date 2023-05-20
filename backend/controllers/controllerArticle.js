'use strict'


var validator = require('validator');
var fs = require('fs');
var path = require('path');
var Article = require('../models/modelArticle.js');
var moment = require('moment');

const { exists } = require('../models/modelArticle.js');
const { now } = require('mongoose');


var controller = {
   datosCurso : (req, res)=>{
      var saludo = req.body.hola;
      return res.status(200).send({
         curso:"NodeJS",
         alumno:"Jorge Díaz",
         url:"jrgdz.com.ec",
         saludo
      })
   },

   test:(req, res)=>{
      return res.status(200).send({
         message : 'Soy la acción TEST de mi controlador de artículos'
      });
   },

   save:(req, res)=>{
      
      //Restar Horas
      //var momentNow = moment().subtract(5,'hours');

      // Recoger parametros por post
      var params = req.body;
      
      // Validar datos
      try {
         var validate_title = !validator.isEmpty(params.title);
         var validate_content = !validator.isEmpty(params.content);
      } catch (err) {
         return res.status(200).send({
            status:'error',
            message:'Faltan datos por enviar!!!'
         });
      }

      if (validate_title && validate_content){
         // Crear el objeto a guardar
         var article = new Article();

         // Asignar valores al objeto
         article.title = params.title;
         article.content = params.content;
         article.date= now();
         if (params.image)
         {
            article.image = params.image
         }else{
            article.image = null;
         }
         

         // Guardar el articulo
         article.save((err, articleStored)=>{
            if(err || !articleStored){
               return res.status(404).send({
                  status:'error',
                  message:'El artículo no se ha guardado!!!'
               });
            }

            return res.status(200).send({
               status:'success',
               article: articleStored
            })

         });


      }else{
         return res.status(200).send({
            status:'error',
            message:'Los datos no son validos!!!'
         })
      }

   },

   getArticles:(req, res)=>{

      var query = Article.find({})
      var last = req.params.last;

      if (last || last != undefined){
         query.limit(last)
      }
      //Find
      query.sort('-_id').exec((err, articles)=>{
         if (err){
            return res.status(500). send({
               status:'error',
               message: 'Error al devolver los artículos!!!'
            })
         }

         if(!articles){
            return res.status(404).send({
               status:'error',
               message: 'No existen datos'
            })
         }

         return res.status(200).send({
            status:'success',
            articles
         })
      })

   },

   getArticle:(req,res)=>{
      //Recoger el id de la URL
      var articleId = req.params.id;

      //Validar si existe
      if (!articleId || articleId == null){
         return res.status(404).send({
            status: 'error',
            message: 'Revisar el ID enviado!!!'
         })
      }

      //Buscar el artículo
      Article.findById(articleId, (err, article)=>{

         if(err || !article){
            return res.status(404).send({
               status: 'error',
               message: 'No existe el artículo!!!'
            })
         }

         //Devolver el artículo
         return res.status(200).send({
            status: 'success',
            article
         })


      })

   },

   update:(req, res)=>{
      //Recoger el ID
      var articleId = req.params.id;
      if (!articleId || articleId == null){
         return res.status(500).send({
            status:'error',
            message:'Revisar el ID enviado!!!'
         })
      }
      //Recoger los datos que llegan desde el PUT
      var params = req.body

      //Validar los datos
      try {
         var validate_title = !validator.isEmpty(params.title);
         var validate_content = !validator.isEmpty(params.content);
      } catch (err) {
         return res.status(404).send({
            status:'error',
            message:'Validación de datos incompleta!!!'
         })
      }

      //Find and update
      if (validate_title && validate_content){
         Article.findOneAndUpdate({_id: articleId},params,{new:true},(err,articleUpdate)=>{
            if (err){
               return res.status(500).send({
                  status:'error',
                  message:'Error al actualizar!!!'
               })
            }

            if (!articleUpdate){
               return res.status(404).send({
                  status:'error',
                  message:'No se realizó la actualización!!!'
               })
            }

            return res.status(200).send({
               status:'success',
               article: articleUpdate
            })

         })
      }else{
         return res.status(200).send({
            status:'error',
            message:'La validación de datos fue incorrecta!!!'
         })
      }

   },

   delete:(req,res)=>{
      //Recoger el ID
      var articleId = req.params.id;
      if (!articleId || articleId == null){
         return res.status(500).send({
            status:'error',
            message:'Revisar el ID enviado!!!'
         })
      }
      
      //Find and Delete
      Article.findOneAndDelete({_id: articleId},(err, articleRemove)=>{
         if(err){
            return res.status(500).send({
               status:'error',
               message:'Error al remover!!!'
            })
         }
         if(!articleRemove){
            return res.status(404).send({
               status:'error',
               message:'No se ha realizado el borrado!!!'
            })
         }
         return res.status(200).send({
            status:'success',
            articleRemove
         })
      })
      
   },

   upload: (req,res)=>{
      //Configurar connect multiparty router/artcile.js

      //Recoger el fichero de la petición
      var file_name = 'Imagen no subida'
      console.log(req.files);

      if(!req.files){
         return res.status(404).send({
            status: 'error',
            message: file_name
         })
      }
      //Conseguir el nombre y la extensión del archivo
      var file_path = req.files.file0.path;
      var file_split = file_path.split('\\');
      var file_name = file_split[2];
      var extension_split = file_name.split('.');
      var file_ext = extension_split[1];

      //Comprobar la extensión, solo imagenes, si no es valida borrar el fichero
      if(file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif'){
         fs.unlink(file_path, (err)=>{
            return res.status(404).send({
               status: 'error',
               message: 'La extensión de la imagen no es valida!!!'
            })
         })
      }else{
         var articleId = req.params.id;

         if(articleId){
            Article.findOneAndUpdate({_id:articleId},{image:file_name}, {new:true}, (err, articleUpdated)=>{
               if(err || !articleUpdated){
                  return res.status(500).send({
                     status:'error',
                     message:'Error al subir la imagen!!!'
                  }); 
               }
   
               return res.status(200).send({
                  status:'success',
                  article: articleUpdated
               }); 
            })
         }else{
            return res.status(200).send({
               status:'success',
               image:file_name
            }); 
         }


      }

   },

   getImage:(req, res)=>{
      var file = req.params.image;
      var path_file = './upload/articles/' + file;
      fs.exists(path_file, (exists)=> {
         if(exists){
            return res.sendFile(path.resolve(path_file));
         }else{
            return res.status(404).send({
               status:'error',
               message: 'La imagen no existe!!!'
            })
         }
      });


   },

   search:(req,res)=>{
      //Obtener el string a buscar
      var searchString = req.params.search;

      //Find or
      Article.find({ "$or":[
         {"title":{"$regex":searchString , "$options": "i"}},
         {"content":{"$regex":searchString , "$options": "i"}}
      ]})
      .sort([['date', 'descending']])
      .exec((err, articles)=>{
         if(err){
            return res.status(404).send({
               status:'error',
               message:'Error en la petición de busqueda!!!'
            })
         }
         if(!articles || articles.length<=0){
            return res.status(404).send({
               status:'error',
               message:'No ha y coincidencias para la busqueda realizada!!!'
            })
         }

         return res.status(200).send({
            status :'success',
            articles
         })

      })


   }
   
}; //end controller

module.exports = controller;
