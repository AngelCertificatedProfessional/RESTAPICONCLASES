const {Router} = require('express')
const {check} = require('express-validator');
const { crearProducto,
        obtenerProductos,
        obtenerProducto,
        actualizarProducto,
        borrarProducto } = require('../controllers/productos');
const { existeCategoriaPorId,existeProductoPorId } = require('../helpers/db-validators');
const {validarJWT, validarCampos, esAdminRole} = require('../middlewares')

const router = Router();

/** 
 * {{url}}/api/categorias
 * 
*/
//Obtener todas las cateogorias - publico
router.get('/',obtenerProductos)

//obtener una categoria por id- publico
router.get('/:id',[
    check('id','No es un id de Mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],
obtenerProducto)

//crear categoria - privado - cualquier persona con un token valido
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
],crearProducto)

//actualizar categoria - privado - cualquier persona con un token valido
router.put('/:id',[
    validarJWT,
    check('id').custom(existeProductoPorId),
    validarCampos
],
actualizarProducto)

//borrar categoria - privado - cualquier persona con un token valido
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id de Mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
]
,borrarProducto)


module.exports = router;