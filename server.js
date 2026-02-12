// server.js
const { addonBuilder, serveHTTP } = require('stremio-addon-sdk');
const manifest = require('./manifest.json'); // asegúrate de tener tu manifest

// Creamos el addon
const builder = new addonBuilder(manifest);

// Aquí agregas tus streams, catálogos y demás funciones
builder.defineCatalogHandler(async (args) => {
    // Devuelve objetos de películas, series, documentales, etc.
    return {
        metas: [
            {
                id: 'tt1234567',
                type: 'movie',
                name: 'Mi Película',
                poster: 'https://link-a-poster.com/poster.jpg',
                description: 'Descripción de ejemplo'
            }
        ]
    };
});

// Servimos el addon en un puerto
const server = serveHTTP(builder);
const port = process.env.PORT || 7000;
server.listen(port, () => console.log(`Addon corriendo en http://localhost:${port}`));
