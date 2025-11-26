# ⚙️ Spendly - Backend API

**Spendly Backend** es una API RESTful robusta desarrollada en **Node.js** y **Express** que sirve como núcleo para la gestión de finanzas personales de la aplicación móvil Spendly.

Este servidor gestiona la lógica de negocio, la persistencia de datos (MongoDB/Memoria), la autenticación de usuarios y la integración con servicios externos de cotización de divisas.

## 🚀 Características Principales

* **Arquitectura Modular:** Diseño en capas (Rutas, Controladores, Servicios, DAO) para una clara separación de responsabilidades.
* **Persistencia Flexible (DAO):** Implementación del patrón **Factory** que permite alternar entre persistencia en **MongoDB** (Producción) y **Memoria** (Desarrollo/Testing).
* **Autenticación JWT:** Sistema seguro de Registro y Login utilizando *JSON Web Tokens* y encriptación de contraseñas con *bcryptjs*.
* **Conversión de Moneda en Tiempo Real:** Integración con API externa (`DolarAPI`) para obtener cotizaciones (Oficial, Blue, Tarjeta) con sistema de **Caché** para optimizar el rendimiento.
* **Gestión de Archivos:** Soporte para subir comprobantes (imágenes/PDF) utilizando **Multer**.
* **Seed de Datos:** Carga automática de categorías por defecto al iniciar la aplicación.

## 🛠️ Stack Tecnológico

* **Runtime:** [Node.js](https://nodejs.org/)
* **Framework:** [Express.js](https://expressjs.com/)
* **Base de Datos:** [MongoDB](https://www.mongodb.com/) (con Mongoose ODM)
* **Seguridad:** `bcryptjs` (Hashing), `jsonwebtoken` (JWT), `cors`.
* **Manejo de Archivos:** `multer`.
* **Peticiones HTTP:** `axios` (para consumo de APIs externas).
* **Testing:** `mocha`, `chai`, `supertest`.

## 🔧 Instalación y Configuración

### 1. Prerrequisitos
* Tener instalado **Node.js** (v14 o superior).
* Tener una instancia de **MongoDB** corriendo (local o Atlas).

### 2. Instalación de Dependencias
```bash
# Clonar repositorio
git clone <URL_DEL_REPOSITORIO>

# Entrar en la carpeta
cd SpendlyBackendApp

# Instalar paquetes
npm install
````

### 3\. Configuración de Variables de Entorno (.env)

Crea un archivo `.env` en la raíz del proyecto para configurar el entorno. Si no lo creas, el sistema usará valores por defecto (Persistencia en Memoria).

```env
# Puerto del servidor
PORT=8080

# Modo de Persistencia: 'MONGODB' o 'MEM' (Memoria)
MODO_PERSISTENCIA=MONGODB

# Cadena de conexión a MongoDB (Local o Atlas)
STRCNX=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/test

# Nombre de la base de datos
BASE=spendly_db

# Secreto para firmar los Tokens (¡Cámbialo!)
JWT_SECRET=tu_secreto_super_seguro
```

### 4\. Ejecutar el Servidor

```bash
# Modo producción/estándar
npm start

# O directamente con Node
node app.js
```

El servidor iniciará en `http://localhost:8080`.

## 📂 Estructura del Proyecto

```text
src/
├── controllers/    # Manejo de Request/Response HTTP
├── services/       # Lógica de Negocio y validaciones
├── data/           # Capa de Acceso a Datos (DAOs y Factory)
├── db/             # Conexión a Mongo y Schemas (Modelos)
├── routes/         # Definición de endpoints
├── middleware/     # Middlewares (ej: upload de archivos)
├── uploads/        # Carpeta pública donde se guardan los comprobantes
├── test/           # Tests unitarios y de integración
└── config.js       # Carga de configuración centralizada
```

## 🔗 Documentación de API (Endpoints)

### 🔐 Autenticación (`/auth`)

  * `POST /auth/register`: Crear nuevo usuario.
  * `POST /auth/login`: Iniciar sesión y obtener Token.

### 💸 Gastos (`/gastos`)

  * `GET /`: Obtener todos los gastos.
  * `GET /:id`: Obtener detalle de un gasto.
  * `POST /`: Crear nuevo gasto (Soporta `multipart/form-data` para archivos).
  * `PUT /:id`: Actualizar gasto existente.
  * `DELETE /:id`: Eliminar gasto.

### 📂 Categorías (`/categorias`)

  * `GET /`: Listar categorías.
  * `POST /`: Crear nueva categoría.
  * `PUT /:id`: Editar categoría.
  * `DELETE /:id`: Eliminar categoría.

### 💵 Dólar y Conversiones (`/dolar`)

  * `GET /`: Obtener todas las cotizaciones actuales.
  * `GET /convertir`: Calcular conversión (Params: `monto`, `moneda`, `tipoConversion`).

## 🧪 Testing

El proyecto incluye una suite de tests unitarios y de integración.

```bash
# Ejecutar tests unitarios (Servicios)
npm run test-unit

# Ejecutar tests de integración (Endpoints)
npm run test-integration
```

## 👥 Autores

  * **Loria Sofia** - *Desarrollo Backend*
  * **Agis Agustin** - *Desarrollo Backend*
  * **Tello Matias** - *Desarrollo Backend*
  * **Imizcoz Lucas** - *Desarrollo Backend*

-----

*Proyecto desarrollado para la materia "Taller de Programacion 2" - 2025 2C.*

```
```
