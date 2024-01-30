const { Reportes } = require('../models/reportes');
const {generateReportPDF} = require("../libs/export");
const {Usuario} = require("../models/usuarios");
const {Equipos} = require("../models/dispositivos");
const {Area} = require("../models/area");
const {Prioridad} = require("../models/prioridad");
const {TipoReporte} = require("../models/tipoReportes");
async function getReportes(req, res) {
    try {
        const reports = await Reportes.findAll();
        res.json(reports);
    }
    catch (error) {
        res.status(500)
    }
}

async function getReporte(req, res) {
    try {
        const {id} = req.params;
        const report = await Reportes.findByPk(id)
        if(report) return res.json(report)
        else return res.status(404).json({message: 'Not found'})
    }
    catch (error) {
        res.status(500).json({err: error})
        console.log(error);
    }
}

async function createReporte(req, res) {
    try {
        const {idEquipo, idUsuario, idTipoReporte, prioridad, descripcion} = req.body;
        if(Object.entries(req.body).length === 0) return res.status(400).json({message: "Error, check your body"})
        const idPrioridad = (await Prioridad.findOne({where: {'valor': prioridad}})).id
        const newReportBody = {
            descripcion: descripcion,
            fecha: new Date(),
            PrioridadId: idPrioridad,
            TipoReporteId: idTipoReporte,
            UsuarioId: idUsuario,
            EquipoId: idEquipo
        }
        await Reportes.create(newReportBody);
        return res.json({message: 'Reporte Creado'})
    }
    catch (err) {
        res.status(500).json({err: err})
        console.log(err);
    }
}

async function updateReporte(req, res) {
    try {
        const {id}= req.params;
        const { descripcion, idPrioridad, idTipoReporte, idUsuario, idEquipo } = req.body;
        if(Object.entries(req.body).length === 0) return res.status(400).json({message: "Bad request"})
        const updatedBody = {
            descripcion: descripcion,
            fecha: new Date(),
            PrioridadId: idPrioridad,
            TipoReporteId: idTipoReporte,
            UsuarioId: idUsuario,
            EquipoId: idEquipo
        }
        const updated = await Reportes.update(updatedBody, {where: {id: id}})
        if(updated[0] === 0) return res.json({message: "Reporte no actualizado"})
        else return res.json({msg: 'Reporte Actualizado'});
    }
    catch (err) {
        res.json({err: err})
    }
}

async function deleteReporte(req, res) {
    try {
        const {id} = req.params;
        const reportFound = await Reportes.findByPk(id);
        if(reportFound) {
            await Reportes.destroy({where: {id: id}})
            return res.json({message: 'Reporte Borrado'})
        } else {
            return res.status(404).json({error: 'Not found'})
        }
    }
    catch (error) {
        res.status(400).json({error: error})
    }
}

async function sendFileReporte(req,res){
    const capitalizeWord = (string) => {return string.charAt(0).toUpperCase() + string.slice(1)}
    const {id} = req.params;
    const reportFound = await Reportes.findByPk(id);
    const userFound = await Usuario.findByPk(await reportFound.dataValues.UsuarioId)
    const equipoFound = await Equipos.findByPk(await reportFound.dataValues.EquipoId)
    const areaFound = await Area.findOne({where : {id: equipoFound.dataValues.AreaId}})
    console.log(capitalizeWord(userFound.dataValues.nombre))
    const reportData = {
        tipo: (await reportFound.getTipoReporte()).tipo,
        content: {
            equipo: equipoFound.dataValues.nombre || "El equipo no tiene nombre",
            area: (areaFound.dataValues.area) || "El equipo no tiene area",
            prioridad : (await reportFound.getPrioridad()).valor,
            usuario: (`${capitalizeWord(userFound.dataValues.nombre)} ${capitalizeWord(userFound.dataValues.apellido)}` || "Sin nombre"),
        },
        description: {
            detalles: reportFound.dataValues.descripcion,
            observaciones: ''
        }
    }
    const data = reportData
    const file = Buffer.from(await generateReportPDF(data));
    res.contentType("application/pdf");
    res.status(200).send(file)
}

module.exports = {
    getReportes, getReporte, sendFileReporte, createReporte, updateReporte, deleteReporte
}