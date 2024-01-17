const conexion = require('../database/conexion');
const query = require('../database/query')

async function lista(req, res) {
    try {
        let pool = await sql.connect(config);
        let dispositivos = await pool.request().query(query.listaDispositivo);
        res.send(dispositivos.recordsets);
    }
    catch (error) {
        console.log(error);
    }
}

async function dispositivo(req, res) {
    try {
        const {id} = req.paranst;
        const db = await conexion.getConexion();
        let  select = await db.request()
        .input('Id', conexion.sql.Int, id)
        .query(query.Dispositivo);
        if (select.recordset.length > 0)
            res.send('el dispositivo');
        else
            res.send('no hay dispositivo');
    }
    catch (error) {
        console.log(error);
    }
}

async function crear(req, res) {
    try {
        var {idHospital, nombre, area, imagen} = req.body;
        nombre = nombre.toLowerCase();  // toda la cadena la hace en minusculas
        const db = await conexion.getConexion();
        await db.request()
        .input('IdHospital', conexion.sql.Int, idHospital)
        .input('Nombre', conexion.sql.VarChar, nombre)
        .input('Area', conexion.sql.VarChar, area)
        .input('Imagen', conexion.sql.VarChar, imagen)
        .query(query.registroDispositivo);
        return res.send('Dispositivo Creado');
    }
    catch (err) {
        console.log(err);
    }
}

async function actualizar(req, res) {
    try {
        var {id}= req.paranst;
        var {nombre, area, imagen} = req.body;
        nombre = nombre.toLowerCase();  // toda la cadena la hace en minusculas
        const db = await conexion.getConexion();
        await db.request()
        .input('Id', conexion.sql.Int, id)
        .input('Nombre', conexion.sql.VarChar, nombre)
        .input('Area', conexion.sql.VarChar, area)
        .input('Imagen', conexion.sql.VarChar, imagen)
        .query(query.actualizarDispositivo);
        return res.send('Dispositivo Actulizado');
    }
    catch (err) {
        console.log(err);
    }
}

async function eliminar(req, res) {
    try {
        const {id} = req.paranst;
        const db = await conexion.getConexion();
        await db.request().input('Id', conexion.sql.Int, id)
        .query(query.eliminarDispositivo);
        res.send('Dispositivo Borrado');    
    }
    catch (error) {
        console.log(error);
    }
}

module.exports ={
    lista,
    dispositivo,
    crear,
    actualizar,
    eliminar
}