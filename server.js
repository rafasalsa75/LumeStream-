// server.js
const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");
const axios = require("axios");

// El manifiesto de tu addon
const manifest = {
    id: "org.lumestream.addon",
    version: "1.0.0",
    name: "LumeStream",
    description: "Addon de películas y series con guiño a Galicia 🍺🔥",
    resources: ["catalog", "stream"],
    types: ["movie", "series"],
    catalogs: [
        {
            type: "movie",
            id: "lumestream_movies",
            name: "LumeStream Movies"
        }
    ],
    idPrefixes: ["tt"]
};

// Crea el builder sin 'new'
const builder = addonBuilder(manifest);

// Función para obtener streams de ejemplo
builder.defineStreamHandler(async function(args) {
    // args.id = id de la película/serie
    // Retorna streams de prueba, luego puedes añadir lógica real con axios
    return {
        streams: [
            {
                title: "LumeStream HD",
                url: "https://example.com/stream.mp4",
                infoHash: "dummyhash",
                quality: "1080p",
                type: "direct"
            }
        ]
    };
});

// Función para catalogar películas
builder.defineCatalogHandler(async function(args) {
    return {
        metas: [
            {
                id: "tt0000001",
                type: "movie",
                name: "Película de ejemplo LumeStream",
                poster: "https://via.placeholder.com/300x450.png?text=LumeStream",
                background: "https://via.placeholder.com/1280x720.png?text=Background",
                releaseInfo: "2026",
                imdbRating: 8.5
            }
        ]
    };
});

// Servir el addon en HTTP
serveHTTP(builder, { port: process.env.PORT || 7000 });

console.log("LumeStream addon corriendo en puerto " + (process.env.PORT || 7000));
