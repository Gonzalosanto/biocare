//////////////////////Arranque de aplicación/////////////////////////////
/////////////////////////////////////////////////////////////////////////
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { router } = require('./routes/index.js');

////////// Inicialización //////////
const app = express();

////////// Configuración //////////
app.set('port', process.env.PORT || 4000);

////////// Middlewares //////////
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); // Para aceptar los formularios de los usuarios.
app.use(express.json());

//              ROUTER                 //
app.use('/', router);


//////////Variables globales //////////
const PORT = process.env.port || 4000


////////// Public //////////
app.use(express.static(path.join(__dirname, 'public')));

////////// Start Server //////////
app.listen(PORT, () => {
    console.log('Server | PORT', PORT)
});