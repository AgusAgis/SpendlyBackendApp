const CategoriaModel = require('./schemas/categoria.schema');

const categoriasDefault = [
  {
    titulo: "Comida",
    imagen: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
  },
  {
    titulo: "Transporte",
    imagen: "https://cdn-icons-png.flaticon.com/512/1147/1147931.png"
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