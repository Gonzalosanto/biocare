const controller = require('../controllers/reporteController')
const express = require('express');
const route = express.Router();

const reporteRoutes = route
    .get('/', controller.getReportes)
    .get('/pdf/:id', controller.sendFileReporte)
    .get('/:id', controller.getReporte)
    .post('/', controller.createReporte)
    .put('/:id', controller.updateReporte)
    .delete('/:id', controller.deleteReporte)

module.exports = {reporteRoutes};