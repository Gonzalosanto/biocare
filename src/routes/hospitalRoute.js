const controller = require('../controllers/hospitalController')
const express = require('express');
const route = express();


route
    .get('/login', controller.login)
    .post('/registro', controller.registro);

module.exports = route;
