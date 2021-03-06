const bcryptjs = require('bcryptjs');
const {response} = require('express');
const { generarJWT } = require('../helpers/generar-jwt');
const Usuario = require('../models/usuario')


const login = async (req,res = response) => {

    const {correo, password} = req.body;

    try{

        // Verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg:"El usuario/password no son correctos -- correo"
            })
        }
        //Si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / password no so corretos - estado: false' 
            })
        }
        //verificar contrasena
        const validPassword = bcryptjs.compareSync(password,usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario / password no so corretos - password' 
            })
        }

        //generar el token
        const token = await generarJWT(usuario.id);



        res.json({
            usuario,
            token
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            "msg": "Hable con el administrador"
        })
    }

}

module.exports = {
    login
}