const upload = require('../middleware/upload');
// routes/gastos.routes.js

const express = require('express');
const router = express.Router();
const gastosController = require('../controllers/gastos.controller'); // Importa el Controlador

// Rutas para /gastos
router.get('/', gastosController.getGastos);      // GET /gastos
router.post('/', upload.single('archivo'), gastosController.createGasto);    // POST /gastos

// Rutas para /gastos/:id
router.get('/:id', gastosController.getGasto);    // GET /gastos/:id
router.put('/:id', upload.single('archivo'), gastosController.updateGastoController); // PUT /gastos/:id
router.delete('/:id', gastosController.deleteGastoController); // DELETE /gastos/:id



module.exports = router;