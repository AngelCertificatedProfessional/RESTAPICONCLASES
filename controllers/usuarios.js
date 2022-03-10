const { response } = require('express')


const usuariosGet = (req, res = response) => {

    const query = req.query;

    res.json({
        query,
        msg:'Get api - controlador'
    })
}

const usuariosPost = (req, res = response) => {

    const body = req.body;

    res.json({
        msg:'post api - controllador',
        body
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