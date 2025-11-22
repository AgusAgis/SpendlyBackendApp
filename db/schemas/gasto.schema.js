// db/schemas/gasto.schema.js
const mongoose = require('mongoose');

const gastoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    categoria: { type: String, required: true },
    fecha: { type: Date, required: true }, 
    imagen: { type: String, default: null },
    montoEnARS: { type: Number, required: true },
    monto: { type: Number, required: true },
    moneda: { type: String, required: true },
    tipoConversion: { type: String, default: null },
    archivo: { type: String, default: null }
});

const GastoModel = mongoose.model('gastos', gastoSchema);

module.exports = GastoModel;