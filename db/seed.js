const CategoriaModel = require('./schemas/categoria.schema');

const categoriasDefault = [
   {
    titulo: "Comida",
    imagen: "https://cdn-icons-png.flaticon.com/512/1046/1046857.png"
  },
  {
    titulo: "Transporte",
    imagen: "https://cdn-icons-png.flaticon.com/512/743/743131.png"
  },
  {
    titulo: "Entretenimiento",
    imagen: "https://cdn-icons-png.flaticon.com/512/4319/4319047.png"
  },
  {
    titulo: "Hogar",
    imagen: "https://cdn-icons-png.flaticon.com/512/6676/6676728.png"
  },
  {
    titulo: "Educación",
    imagen: "https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
  },
  {
    titulo: "Salud",
    imagen: "https://cdn-icons-png.flaticon.com/512/2966/2966327.png"
  },
  {
    titulo: "Compras",
    imagen: "https://cdn-icons-png.flaticon.com/512/1261/1261163.png"
  },
  {
    titulo: "Delivery",
    imagen: "https://cdn-icons-png.flaticon.com/512/1046/1046869.png"
  },
  {
    titulo: "Viajes",
    imagen: "https://cdn-icons-png.flaticon.com/512/201/201623.png"
  },
  {
    titulo: "Idiomas",
    imagen: "https://cdn-icons-png.flaticon.com/512/3917/3917188.png"
  }
];

//inserta solo las que falten, sin duplicar
const seedCategorias = async () => {
  for (const cat of categoriasDefault) {
    await CategoriaModel.updateOne(
      { titulo: cat.titulo },   // si existe ese titulo...
      { $setOnInsert: cat },     // solo lo inserta si NO existe
      { upsert: true }
    );
  }
};

module.exports = { seedCategorias };