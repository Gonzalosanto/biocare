const bcrypt = require("bcryptjs"); // modulo para la encriptacion de las claves

async function encryptPassword(password) { // encripta la contraseña que sera enviada a la base de datos
    return await bcrypt.hashSync(password ,bcrypt.genSaltSync(10));
}
async function authPassword(password, hash) { //Compara la contraseña ingresada con la que esta encriptada en la db
    return await bcrypt.compareSync(password, hash); 
}

module.exports = {
    encryptPassword,
    authPassword
};