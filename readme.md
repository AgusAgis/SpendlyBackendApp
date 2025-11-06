# 💸 SpendlyBackend: API de Gestión Financiera

Este proyecto es una **API RESTful** diseñada para la gestión completa de **Gastos** (CRUD). Está desarrollada en **Node.js** y **Express**, y sigue rigurosamente una arquitectura modular basada en **Cuatro Capas** (Controller, Service, Data, Routes) para garantizar escalabilidad y mantenimiento.

***

## 🛠️ Tecnologías Utilizadas

| Categoría | Tecnología | Uso en el Proyecto |
| :--- | :--- | :--- |
| **Backend (Motor)** | **Node.js** | Entorno de ejecución de JavaScript. |
| **Framework Web** | **Express.js** | Creación del servidor, gestión de *middleware* y enrutamiento. |
| **Arquitectura** | **Arquitectura por Capas** | Clara separación de responsabilidades para un código robusto. |
| **Persistencia** | **Persistencia en Memoria** | Almacenamiento temporal de los datos de gastos dentro de la capa Data (DAO). |
| **Lenguaje** | **JavaScript** (ES6 Classes, Async/Await) | Implementación de clases y manejo moderno de operaciones asíncronas. |

***

## 📐 Arquitectura del Proyecto

El proyecto está estructurado en las siguientes capas, lo que permite una **clara separación de responsabilidades** (SoC):

1.  **`routes/`**: Define los *endpoints* HTTP y los dirige al Controller.
2.  **`controllers/`**: Maneja la **petición (`req`) y respuesta (`res`)** HTTP y llama al Service.
3.  **`services/`**: Contiene la **Lógica de Negocio** y las validaciones complejas. Llama a la capa Data.
4.  **`data/`**: Simula la capa de **Persistencia (DAO)** y maneja el almacenamiento de los gastos en memoria.
***

## 🔗 Endpoints de la API: Gestión de Gastos

Se implementa la funcionalidad **CRUD** completa para la gestión de gastos en la ruta base `/gastos`.

| Método | Ruta Completa | Controller (Función) | Descripción | Formato de Entrada/Salida |
| :--- | :--- | :--- | :--- | :--- |
| **`GET`** | `/gastos` | `getGastos` | Obtiene todos los gastos registrados. | **Salida:** Lista de objetos `Gasto`. |
| **`POST`** | `/gastos` | `createGasto` | **Crea** un nuevo registro de gasto. | **Entrada:** `{ descripcion, monto, fecha, categoria }`<br>**Salida:** `201 Created` |
| **`GET`** | `/gastos/:id` | `getGasto` | Obtiene un gasto específico por su ID. | **Salida:** Objeto `Gasto`. |
| **`PUT`** | `/gastos/:id` | `updateGastoController` | **Actualiza** completamente un gasto existente. | **Entrada:** `{ descripcion, monto, fecha, categoria }`<br>**Salida:** `200 OK` |
| **`DELETE`** | `/gastos/:id` | `deleteGastoController` | **Elimina** un gasto por su ID. | **Salida:** `204 No Content` |

***

## 🚀 Cómo Poner en Marcha el Servidor

### 1. Clonar el Repositorio

```bash
git clone [https://github.com/AgusAgis/misGastitosBackend.git]
cd GastitosBackend
Instalación de Dependencias
Asegúrate de tener Node.js instalado y utiliza npm:
Bash npm install
Iniciar el Servidor
Bash node app.js
El servidor estará disponible en http://localhost:[8080].