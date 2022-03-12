const { response } = require('express')
const Usuario = require('../models/usuario');

const usuariosGet = (req, res = response) => {

    const query = req.query;

    res.json({
        query,
        msg:'Get api - controlador'
    })
}

const usuariosPost = async (req, res = response) => {
    const body = req.body;
    const usuario = new Usuario(body);
    await usuario.save();

    res.json({
        msg:'post api - controllador',
        usuario    
    })
}

const usuariosPut = (req, res = response) => {

    const {id} = req.params;

    res.json({
        id,
        msg:'put api - controllador'
    })
}

const usuariosPath= (req, res = response) => {
    res.json({
        msg:'path api - controllador'
    })
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg:'Delete api - controllador'
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPath,
    usuariosDelete
}