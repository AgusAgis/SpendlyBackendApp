// services/auth.service.js
const Usuario = require('../db/schemas/users.schema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'tu_clave_secreta_super_segura'; // En producción, usa variables de entorno (.env)

const login = async (email, password) => {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
        throw new Error('Credenciales inválidas'); // no encontro usuario
    }

    // validamos password ingresada con encripted
    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
        throw new Error('Credenciales inválidas');
    }

    // generamos token
    const token = jwt.sign({ id: usuario._id, email: usuario.email }, JWT_SECRET, { expiresIn: '2h' });

    return { token, usuario };
};

const register = async (data) => {
    // encriptamos contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const nuevoUsuario = new Usuario({
        ...data,
        password: hashedPassword
    });
    return await nuevoUsuario.save();
};

module.exports = { login, register };