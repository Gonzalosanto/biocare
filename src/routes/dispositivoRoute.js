const controller = require('../controllers/dispositivoController');
const express = require('express');
const router = express.Router();

router
    .get('/lista', controller.lista)
    .get('/dispositivo', controller.dispositivo)
    .post('/crear', controller.crear)
    .put('/actualizar', controller.actualizar)
    .delete('/eliminar', controller.eliminar);

module.exports = router;