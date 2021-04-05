const router = require('express').Router();
const { getAll,getOne, setData } = require('../controllers/pais.controller');


router.get('/paises/',getAll);
/**
 * Por fines practicos utilizo un el metodo get
 */
router.get('/paises/setData',setData);

router.get('/paises/:id',getOne);



module.exports = router;