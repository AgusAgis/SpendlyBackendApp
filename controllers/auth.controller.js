const authService = require('../services/auth.service');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const resultado = await authService.login(email, password);
        res.json(resultado);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

const register = async (req, res) => {
    try {
        const usuario = await authService.register(req.body);
        res.status(201).json(usuario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { login, register };