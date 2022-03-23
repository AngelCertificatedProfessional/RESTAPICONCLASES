const { response } = require('express')
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');

const usuariosGet = async(req, res = response) => {

    //const query = req.query;
    const {limite =5,desde=0} = req.query;
    // const usuarios = await Usuario.find({estado:true}).skip(desde).limit(Number(limite));

    // const total = await Usuario.countDocuments({estado:true});

    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments({estado:true}),
        Usuario.find({estado:true}).skip(desde).limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    })
}

const usuariosPost = async (req, res = response) => {

    const {nombre,correo,password,rol} = req.body;
    const usuario = new Usuario({nombre,correo,password,rol});

    //verificar la encriptacion
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);
    //guardar en BD
    await usuario.save();
    res.json({
        msg:'post api - controllador',
        usuario    
    })
}

const usuariosPut = async(req, res = response) => {

    const {id} = req.params;
    const {_id,password,google,...resto} = req.body;

    //TODO validar contra la base de datos
    if(password){
        //verificar la encriptacion
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto); 


    res.json({
        id,
        usuario
    })
}

const usuariosPath= (req, res = response) => {
    res.json({
        msg:'path api - controllador'
    })
}

const usuariosDelete = async(req, res = response) => {

    const {id} = req.params;
    const uid = req.uid;
    //fisciamente lo borramos

    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false})

    res.json({
        usuario,
        uid
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPath,
    usuariosDelete
}