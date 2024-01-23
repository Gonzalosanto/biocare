const controllerUsuario= require('../controllers/usuarioController')
const express = require('express');
const userRoutes = express.Router();

userRoutes
    .get('/', controllerUsuario.getUsuarios)
    .get('/:id', controllerUsuario.getUsuario)
    .post('/login', controllerUsuario.login)
    .post('/registro', controllerUsuario.createUsuario)
    .put('/recuperar', controllerUsuario.updateUsuarioPassword)
    .put('/:id', controllerUsuario.updateUsuario)
    .delete('/:id', controllerUsuario.deleteUsuario);

module.exports = {userRoutes};