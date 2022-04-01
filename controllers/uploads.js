const { response } = require("express");
const { subirArchivo } = require("../helpers");


const cargarArchivo = async(req,res = response) => {

    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).send('No hay archivos que subir.');
      return;
    }
  
    if (!req.files.archivo) {
        res.status(400).send('No hay archivos que subir.');
        return;
    }
    //Imagenes
    try{
        const nombre = await subirArchivo(req.files,undefined,'imgs')
        res.json({
            nombre
        });
    }catch(error){
        res.status(400).json({error})
    }
    
}

const actualizarImagen = async(req,res = response) => {
    const {id,coleccion} =req.params;
    res.json({id,coleccion})
}

module.exports = {cargarArchivo,actualizarImagen};