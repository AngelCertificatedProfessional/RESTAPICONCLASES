const {Router} = required('express');
const {buscar} = require('../controllers/buscar')

const router = Router();

router.get('/:coleccion/:termino',buscar)

module.exports = router;