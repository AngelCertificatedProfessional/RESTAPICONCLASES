const { response } = require("express");
const {ObjectId} = require('mongoose').Types;
const {Usuario,Categoria,Producto} = require('../models')

const coleccionesPermitidas = [
    'usuarios',
    'categoria',
    'productos',
    'roles'
];

const buscarUsuarios = async(termino = '',res = response) => {
    const esMongoId = ObjectId.isValid(termino);

    if(esMongoId){
        const usuario = await Usuario.findById(termino);
        res.json({
            results: (usuario) ? [ usuario ] : []
        })
    }
}



const buscar = (req,res = response) => {

    const{coleccion,termino} = req.params

    if(coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Las colecciones permitidas`
        })
    }

    switch(coleccion){
        case 'usuarios':
            buscarUsuarios(termino,res)
        break;
        case 'categoria':

        break;
        case 'productos':

        break;
        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta busqueda'
            })
    }
}

module.exports = {
    buscar
}