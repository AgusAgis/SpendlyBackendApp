// routes/dolar.routes.js
const express = require('express');
const router = express.Router();
const dolarController = require('../controllers/dolar.controller'); // Importa el Controlador

router.get('/', dolarController.getCotizacionesController);
router.get('/convertir', dolarController.getConversionController);

module.exports = router;
