const conexion = require('../database/conexion');
const query = require('../database/query')

async function lista(req, res) {
    try {
        let pool = await sql.connect(config);
        let dispositivos = await pool.request().query(query.listaReporte);
        res.send(dispositivos.recordsets);
    }
    catch (error) {
        console.log(error);
    }
}

async function reporte(req, res) {
    try {
        const {id} = req.paranst;
        const db = await conexion.getConexion();
        let  select = await db.request()
        .input('Id', conexion.sql.Int, id)
        .query(query.Reporte);
        if (select.recordset.length > 0) {
            res.send('el reporte');
        }else{
            res.send('no hay reporte');
        }     
    }
    catch (error) {
        console.log(error);
    }
}

async function crear(req, res) {
    try {
        var {idDispositivo, prioridad, descripcion} = req.body;
        const db = await conexion.getConexion();
        await db.request()
        .input('IdDispositivo', conexion.sql.Int, idDispositivo)
        .input('Prioridad', conexion.sql.VarChar, prioridad)
        .input('Descripcion', conexion.sql.VarChar, descripcion)
        .query(query.registroReporte);
        return res.send('Reporte Creado');
    }
    catch (err) {
        console.log(err);
    }
}

async function actualizar(req, res) {
    try {
        var {id}= req.paranst;
        var {prioridad, descripcion} = req.body;
        const db = await conexion.getConexion();
        await db.request()
        .input('Id', conexion.sql.Int, id)
        .input('Prioridad', conexion.sql.VarChar, prioridad)
        .input('Descripcion', conexion.sql.VarChar, descripcion)
        .query(query.actualizarReporte);
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
        .query(query.eliminarReporte);
        res.send('Reporte Borrado');    
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    lista,
    reporte,
    crear,
    actualizar,
    eliminar
}