const { Sequelize } = require('sequelize');

const databaseInstance = new Sequelize({
        dialect: process.env.DATABASE_DIALECT || "mysql",
        host: process.env.DATABASE_HOSTNAME || "localhost",
        database: process.env.DATABASE_NAME || 'biocare-db',
        password: process.env.DATABASE_PASSWORD || 'root',
        username: process.env.DATABASE_USERNAME || 'root'
    })

try {
    databaseInstance.sync({alter: true})
        .then(() => {console.log("La conexion se establecio correctamente")})
        .catch(reason => { throw new Error(reason)});
} catch (e) {
  throw new Error(e)
}

module.exports = {databaseInstance}