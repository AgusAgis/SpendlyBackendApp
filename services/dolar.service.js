const axios = require('axios');

// Caché simple en memoria (le pegamos a la api cada 1hr)
let cache = {
    timestamp: 0,
    data: null
};

// guarda por 1 hora
const CACHE_DURATION = 3600000; 

const getCotizaciones = async () => {
    const now = Date.now();
    if (cache.data && (now - cache.timestamp < CACHE_DURATION)) {
        console.log("Sirviendo desde caché");
        return cache.data;
    }

    try {
        console.log("Buscando de DolarAPI");
        const response = await axios.get('https://dolarapi.com/v1/dolares');

        // guardo en cache
        cache.data = response.data;
        cache.timestamp = now;

        return response.data;
    } catch (error) {
        console.error("Error al buscar en DolarAPI:", error.message);
        //si falla uso info vieja
        if(cache.data) return cache.data;
        throw new Error("No se pudo obtener la cotización");
    }
};

module.exports = {
    getCotizaciones
};