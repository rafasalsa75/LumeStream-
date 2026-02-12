// Imports al principio
const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");
const axios = require("axios");

// Manifesto del addon
const manifest = {
    id: "lumestream-addon",
    version: "1.0.0",
    name: "LumeStream",
    description: "Catálogo de películas y series con guiño a Galicia y cerveza 🍺",
    resources: ["catalog", "stream"],
    types: ["movie", "series"],
    catalogs: [
        { type: "movie", id: "lumestream-movies", name: "Películas LumeStream" },
        { type: "series", id: "lumestream-series", name: "Series LumeStream" }
    ],
};

// Creamos el addon
const builder = new addonBuilder(manifest);

// Catálogo dinámico (puedes conectar APIs externas o usar otros addons)
builder.defineCatalogHandler(async ({ type, id }) => {
    // Ejemplo de catálogo local
    const metas = [
        {
            id: "1",
            type: type,
            name: "Opción Gallega Ejemplo",
            poster: "https://via.placeholder.com/300x450",
            description: "Película ejemplo con guiño a Galicia 🍺",
        },
        {
            id: "2",
            type: type,
            name: "Segunda Película",
            poster: "https://via.placeholder.com/300x450",
            description: "Otra película de prueba",
        },
    ];

    return { metas };
});

// Stream dinámico usando links de otros addons o externos
builder.defineStreamHandler(async ({ id }) => {
    const streams = [
        {
            title: "Stream de ejemplo",
            url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            behaviorHints: { isFree: true },
        },
    ];

    return { streams };
});

// Servimos el addon
serveHTTP(builder);

console.log("✅ LumeStream listo y corriendo!");
