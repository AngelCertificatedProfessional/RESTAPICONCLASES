
const Role = require('../models/role')
const {Usuario,Categoria, Producto} = require('../models');

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

const existeCategoriaPorId = async(id) => {
    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria){
        throw new Error(`La categoria no existe`);
    }
}

const existeProductoPorId = async(id) => {
    const existeProducto= await Producto.findById(id);
    if(!existeProducto){
        throw new Error(`El producto no existe`);
    }
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorID,
    existeCategoriaPorId,
    existeProductoPorId
}