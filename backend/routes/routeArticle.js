'use strict'

var express = require('express');
var ControllerArticle = require('../controllers/controllerArticle');

var router = express.Router();

var multipart = require('connect-multiparty');
var mb_upload = multipart({uploadDir: './upload/articles'});

//Rutas de prueba
router.post('/datos-curso', ControllerArticle.datosCurso);
router.get('/test-de-controlador', ControllerArticle.test);

//Rutas funcionales
router.post('/article', ControllerArticle.save);
router.get('/articles/:last?', ControllerArticle.getArticles);
router.get('/article/:id', ControllerArticle.getArticle);
router.put('/article/:id', ControllerArticle.update)
router.delete('/article/:id', ControllerArticle.delete);
router.post('/upload-image/:id?', mb_upload, ControllerArticle.upload);
router.get('/get-image/:image', ControllerArticle.getImage);
router.get('/search/:search', ControllerArticle.search);

module.exports = router;