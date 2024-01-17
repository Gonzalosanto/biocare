const auth = require('../controllers/authController')
const conexion = require('../database/conexion');
const query = require('../database/query')

async function lista(req, res) {
    try {
        let  pool = await  sql.connect(config);
        let  usuarios = await  pool.request().query(query.listaUsuarios);
        res.send(usuarios.recordsets);
    }
    catch (error) {
        console.log(error);
    }
}

async function usuario(req, res) {
    try {
        const {id} = req.paranst;
        const db = await conexion.getConexion();
        let  select = await db.request()
        .input('Id', conexion.sql.Int, id)
        .query(query.usuario);
        if (select.recordset.length > 0) {
            res.send('el usuario');
        }else{
            res.send('no hay usuario');
        }     
    }
    catch (error) {
        console.log(error);
    }
}

async function login(req, res) {
    try {
      const {clave,usuario} = req.body;
      const nombre = nombre.toLowerCase(); // toda la cadena la hace en minusculas
      const db = await conexion.getConexion();
      let  login = await db.request()
      .input('Usuario', conexion.sql.VarChar, usuario)
      .query(query.loginUsuario);
      const {Clave}= login.recordset[0];
      if (login.recordset.length > 0) {
        const validacion = await auth.authPassword(Clave,clave);
        if(validacion){
          const token = auth.creatToken(login.recordset[0]);    
          res.json({token});
        }
        else
          res.json({ text: "Clave Incorrecta" });
      }
      else
        res.send('Usuario No Encontrado')  
    }
    catch (err) {
      console.log(err);
    }
  }
  
  async function registro(req, res) {
    try {
      var {idHospital, nombre, usuario, clave} = req.body;
      nombre = nombre.toLowerCase();  // toda la cadena la hace en minusculas
      const contra =  await auth.encriptacion(clave) // encriptamos la clave
      const db = await conexion.getConexion();
      await db.request()
      .input('IdHospital', conexion.sql.Int, idHospital)
      .input('Nombre', conexion.sql.VarChar, nombre)
      .input('Usuario', conexion.sql.VarChar, usuario)
      .input('Clave', conexion.sql.VarChar,contra)
      .query(query.registroUsuario);
      return res.send('Usuario Registrado');
    }
    catch (err) {
      console.log(err);
    }
  }

async function actualizar() {
    try {
        var {id} = req.paranst;
        var {nombre, usuario, clave} = req.body;
        nombre = nombre.toLowerCase();  // toda la cadena la hace en minusculas
        const contra =  await auth.encriptacion(clave) // encriptamos la clave
        const db = await conexion.getConexion();
        await db.request()
        .input('Id', conexion.sql.Int, id)
        .input('Nombre', conexion.sql.VarChar, nombre)
        .input('Usuario', conexion.sql.VarChar, usuario)
        .input('Clave', conexion.sql.VarChar,contra)
        .query(query.actualizarUsuario);
        return res.send('Actualizar Usuario');
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
        .query(query.eliminarUsuario);
        res.send('Usuario Eliminado');    
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    lista,
    usuario,
    login,
    registro,
    actualizar,
    eliminar
}