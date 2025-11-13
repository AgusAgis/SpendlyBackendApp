let categorias = [
    { id: 1, titulo: "Hogar", imagen: "https://cdn-icons-png.flaticon.com/512/6676/6676728.png" },
    { id: 2, titulo: "Entretenimiento", imagen: "https://cdn-icons-png.flaticon.com/512/4319/4319047.png" },
    { id: 3, titulo: "Comida", imagen: "https://images.unsplash.com/vector-1739806651163-75929fa8e121?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHx8&ixlib=rb-4.1.0&q=60&w=3000" },
];

let nextId = 4;


const findAll = () => {
    return categorias;
};


const findById = (id) => {
    return categorias.find(categoria => categoria.id === id);
};


const save = (data) => {
    const newgCategoria = {
        id: nextId++,
        titulo: data.titulo,
        imagen: data.imagen
    };
    categorias.push(newgCategoria);
    return newgCategoria;
};


const update = (id, data) => {
    const index = categorias.findIndex(categoria => categoria.id === id);

    if (index === -1) {
        return null;
    }

    const updatedCategoria = {
        ...categorias[index],
        titulo: data.titulo || categorias[index].titulo,
        imagen: data.imagen || categorias[index].imagen,
    };

    categorias[index] = updatedCategoria;
    return updatedCategoria;
};


const remove = (id) => {
    const index = categorias.findIndex(categoria => categoria.id === id);

    if (index === -1) {
        return false;
    }

    categorias.splice(index, 1);
    return true;
};

module.exports = {
    findAll,
    findById,
    save,
    update,
    remove
};