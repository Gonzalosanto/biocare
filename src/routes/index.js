const express = require('express');
const router = express.Router();
const { userRoutes } = require('./usuarioRoute.js');
const { dispositivosRoutes } = require('./dispositivoRoute.js')
const { reporteRoutes } = require('./reporteRoute.js')

router.use('/usuarios', userRoutes); //OK
router.use('/equipos', dispositivosRoutes); //OK
router.use('/reportes', reporteRoutes); //TO CHECK -> endpoints

module.exports = {router};
