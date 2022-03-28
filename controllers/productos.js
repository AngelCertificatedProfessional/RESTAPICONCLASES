const {response} = require('express')
const {Producto} = require('../models')

const crearProducto = async(req,res = response) => {
    
    const {estado,usuario,...body}= req.body;

    const productoDB = await Producto.findOne({nombre:body.nombre});
    if(productoDB){
        return res.status(400).json({
            msg: `La categoria ${productoDB.nombre},ya existe`
        });
    }

    //generar la data a guardar
    const data = {
        ...body,
        nombre : body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = new Producto(data);
    //guardar bd
    await producto.save();

    res.status(201).json(producto)
}

const obtenerProductos = async(req,res = response) => {
    //const query = req.query;
    const {limite =5,desde=0} = req.query;

    const [total,productos] = await Promise.all([
        Producto.countDocuments({estado:true}),
        Producto.find({estado:true})
        .populate('usuario','nombre')
        .populate('categoria','nombre')
        .skip(desde)
        .limit(Number(limite))
    ])

    res.json({
        total,
        productos
    })
}

const obtenerProducto = async(req,res = response) =>{
    const {id} = req.params;
    const producto = await Producto.findById(id).populate('usuario','nombre');
    res.json(producto)
}

const actualizarProducto= async(req,res = response) => {

    const {id} = req.params;
    const {estado, usuario,...data} = req.body;

    if(data.nombre){
        data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id,data,{new:true});

    res.json(producto);
}

const borrarProducto= async(req,res = response) => {
    
    const {id} = req.params;
    const productoBorrada = await Producto.findByIdAndUpdate(id,{estado:false},{new:true})
    res.json(productoBorrada);
}


module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}