const controlerUsuario = require('../controlers/usuarioController')
const express = require('express');
const route = express.Router();

route
    .get('/lista', controlerUsuario.lista)
    .get('/usuario/:id', controlerUsuario.usuario)
    .get('/login', controlerUsuario.login)
    .get('/registro', controlerUsuario.registro)
    .put('/actualizar', controlerUsuario.actualizar)
    .delete('/eliminar', controlerUsuario.eliminar);

module.exports = route;
    