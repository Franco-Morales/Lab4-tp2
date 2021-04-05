const router = require('express').Router();
const { getAll, setData } = require('../controllers/paises.controller');

router.route('/paises/')
    .get(getAll);

router.route('/paises/setData')
    .get(setData);


module.exports = router;