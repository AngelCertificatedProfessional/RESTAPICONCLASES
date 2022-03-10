const { response } = require('express')


const usuariosGet = (req, res = response) => {
    res.json({
        msg:'Get api - controlador'
    })
}

const usuariosPost = (req, res = response) => {
    res.json({
        msg:'post api - controllador'
    })
}

const usuariosPut = (req, res = response) => {
    res.json({
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