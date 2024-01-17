const bcrypt = require("bcrypt"); // modulo para la encriptacion de las claves
const jwt = require('jsonwebtoken'); // modulo para la cracion de los tokens 
const config = require('../config.js');



async function encriptacion(password) { // encripta la contraseña la cual sera enviada la db de datos 
    return await bcrypt.hashSync(password ,bcrypt.genSaltSync(10));
}
async function authPassword(hash, password) { // compara la contraseña ingresada con la que esta encriptada en la db
    return await bcrypt.compareSync(password, hash); 
}
function creatToken(usuario) { // crea el token temporal de inicia de secion 
    const token = jwt.sign({ usuario }, config.TOKEN_SECRET);
    return token;
}

module.exports = {
    encriptacion,
    authPassword,
    creatToken
};