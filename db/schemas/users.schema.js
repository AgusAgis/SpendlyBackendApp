const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    email: { type: String, 
        required: true, 
        unique: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 
            'Por favor, ingresa un email válido'
        ]
    },
    password: { type: String, required: true }, //guardamos password encriptada
    nombre: { type: String }
});

module.exports = mongoose.model('Usuario', usuarioSchema);