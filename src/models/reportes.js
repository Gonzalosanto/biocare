const { databaseInstance } = require('./index.js')
const { DataTypes, INTEGER} = require('sequelize');
const {Prioridad} = require("./prioridad");
const {Usuario} = require("./usuarios");
const {TipoReporte} = require("./tipoReportes");

const Reportes = databaseInstance.define("Reportes",{
    descripcion: {
        type: DataTypes.STRING(300),
    },
    fecha: {
        type: DataTypes.DATE,
        get() {
            const rawDate = this.getDataValue('fecha')
            return new Date(rawDate)
        }
    }
},{
    timestamps: false
})

Reportes.belongsTo(Prioridad, {
    foreignKey: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})

Reportes.belongsTo(TipoReporte, {
    foreignKey: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

Reportes.belongsTo(Usuario, {
    foreignKey: {type:DataTypes.INTEGER, allowNull: false}
})



module.exports = { Reportes }
