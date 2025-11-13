const express = require('express');
const router = express.Router();
const dolarController = require('../controllers/dolar.controller'); 


router.get('/', dolarController.getCotizacionesController); // get /dolar
router.get('/convertir', dolarController.getConversionController); // get /convertir

module.exports = router;
