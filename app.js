// app.js (Archivo principal)

// Importamos Express
const express = require('express');
const app = express();
const port = 8080;
const fs = require('fs')
const path = require('path')


// Importamos las rutas de gastos y categorias
const gastosRoutes = require('./routes/gastos.routes');
const categoriasRoutes = require('./routes/categorias.routes');
const dolarRoutes = require('./routes/dolar.routes.js');


// Middleware
// Para parsear JSON en el cuerpo de las peticiones (POST, PUT)
app.use(express.json());
// Para parsear datos de formularios (URL-encoded) en el cuerpo de las peticiones
app.use(express.urlencoded({ extended: true }));
// Servir archivos estáticos
app.use(express.static('public'));



///directorio uploads para archivos
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log(`Directorio 'uploads' creado en: ${uploadsDir}`);
}   

// ===============================================
// MONTAJE DE RUTAS
// ===============================================

// Usamos el router de gastos para todas las peticiones que empiecen con '/gastos'
app.use('/gastos', gastosRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/dolar', dolarRoutes);
app.use('/uploads', express.static('uploads'));


// Inicialización del servidor
app.listen(port, () => {
    console.log(`Servidor de gastos escuchando en http://localhost:${port}`);
    console.log(`Rutas disponibles:
    GET /gastos
    GET /gastos/:id
    POST /gastos 
    PUT /gastos/:id 
    DELETE /gastos/:id

    GET /categorias
    GET /categorias/:id
    POST /categorias 
    PUT /categorias/:id 
    DELETE /categorias/:id

    GET/dolar
    GET /dolar/convertir

    GET /uploads
    `);
});