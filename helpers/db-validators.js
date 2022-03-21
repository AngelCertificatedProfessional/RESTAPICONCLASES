
const Role = require('../models/role')
const Usuario = require('../models/usuario');

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({rol})
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
}

const emailExiste = async(correo = '') => {
    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error('Ese correo ya existe');
    }
}

const existeUsuarioPorID = async(id) => {
    //Verificar si el id existe
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`eL id no existe ${id}`);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorID
}