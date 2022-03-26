const {Router} = require('express')
const {check} = require('express-validator')
const {validarCampos} = require('../middlewares')

const router = Router();

/** 
 * {{url}}/api/categorias
 * 
*/
//Obtener todas las cateogorias - publico
router.get('/',(req,res) => {
    res.json('get');
})
//obtener una categoria por id- publico
router.get('/:id',(req,res) => {
    res.json('get -id');
})

//crear categoria - privado - cualquier persona con un token valido
router.post('/',(req,res) => {
    res.json('post');
})

//actualizar categoria - privado - cualquier persona con un token valido
router.put('/:id',(req,res) => {
    res.json('put');
})

//borrar categoria - privado - cualquier persona con un token valido
router.delete('/:id',(req,res) => {
    res.json('delete');
})


module.exports = router;