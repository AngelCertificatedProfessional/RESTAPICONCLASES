const {Router} = require('express')
const {check} = require('express-validator')
const {esRoleValido,emailExiste,existeUsuarioPorID} = require('../helpers/db-validators');

const {validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares')

const { usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPath,
    usuariosDelete } = require('../controllers/usuarios');


const router = Router();

router.get('/', usuariosGet);

router.put('/:id',[
    check('id',"No es un ID valido").isMongoId(),
    check('id').custom(existeUsuarioPorID),
    check('rol').custom( (rol) => esRoleValido(rol)),
    validarCampos
],usuariosPut);

router.post('/',[ 
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe ser mas de 6 letras').isLength({min:6}),
    check('correo','El correo no es valido').isEmail(),
    check('rol').custom( (rol) => esRoleValido(rol)),
    check('correo').custom( (correo) => emailExiste(correo)),
    validarCampos
],usuariosPost);

router.delete('/:id',[
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id',"No es un ID valido").isMongoId(),
    check('id').custom(existeUsuarioPorID),
   validarCampos
], usuariosDelete);

router.patch('/', usuariosPath);

module.exports = router;