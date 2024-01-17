const controler = require('../controlers/reporteController')
const express = require('express');
const route = express.Router();

route
    .get('/lista', controler.lista)
    .get('/reporte', controler.reporte)
    .post('/crear', controler.crear)
    .put('/actualizar', controler.actualizar)
    .delete('/eliminar', controler.eliminar)

module.exports = route;