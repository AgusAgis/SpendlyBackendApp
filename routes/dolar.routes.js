// routes/dolar.routes.js
const express = require('express');
const router = express.Router();
const dolarController = require('../controllers/dolar.controller'); // Importa el Controlador

router.get('/', dolarController.getCotizacionesController);

module.exports = router;
