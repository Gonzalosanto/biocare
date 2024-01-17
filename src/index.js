//////////////////////Arranque de aplicación/////////////////////////////
/////////////////////////////////////////////////////////////////////////
const express = require('express');
const morgan = require('morgan');
const path = require('path');

////////// Inicialización //////////
const app = express();

////////// Confguración //////////
app.set('port', process.env.PORT || 4000);

app.engine('jsx', (filePath, options, callback) => {
    const rendered = reactDom.rederToString(
        require(filePath)    
    )
    callback(null, rendered);
});

app.set('views', './views');
app.set('view engine', 'jsx');

////////// Middlewares //////////
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); // Para aceptar los fomulario de los usuarios
app.use(express.json());
// app._router()   // Recibe las rutas de cliente.
// app.express()   // Para recibir arhivos JSON.


//////////Variables globales //////////
app.use((req, res, next) => {
    next();
});

////////// Routes //////////
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));

////////// Public //////////
app.use(express.static(path.join(__dirname, 'public')));

////////// Start Server //////////
app.listen(app.get('port'), () => {
    console.log('Server | PORT', app.get('port'))
});