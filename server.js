// server.js
const { addonBuilder, getStream } = require("stremio-addon-sdk");
const fetch = require("node-fetch");

// Manifesto del addon
const manifest = {
    id: "org.lumestream.addon",
    version: "1.0.0",
    name: "LumeStream",
    description: "Addon Stremio con guiño a Galicia y cerveza 🍺",
    resources: ["stream", "meta"],
    types: ["movie", "series"],
    idPrefixes: ["tt"],
    catalogs: [
        {
            type: "movie",
            id: "lumestream_movies",
            name: "LumeStream Películas",
        }
    ]
};

// Crear builder
const builder = addonBuilder(manifest);

// Lista de addons externos para extraer streams
const externalAddons = [
    "https://v2.api.stremio.com/addon/example1/manifest.json",
    "https://v2.api.stremio.com/addon/example2/manifest.json"
];

// Función para obtener streams de un addon externo
async function getExternalStreams(imdbId) {
    let streams = [];
    for (let addonUrl of externalAddons) {
        try {
            const url = `${addonUrl.replace("/manifest.json","")}/stream/${imdbId}`;
            const res = await fetch(url);
            if (!res.ok) continue;
            const data = await res.json();
            if (data.streams) streams = streams.concat(data.streams);
        } catch (e) {
            console.error("Error fetching from external addon:", e.message);
        }
    }
    return streams;
}

// Handler de streams
builder.defineStreamHandler(async ({ id }) => {
    // Agregamos streams de ejemplo propios
    let streams = [];
    if (id === "tt1234567") {
        streams.push({
            title: "Ejemplo LumeStream",
            url: "https://example.com/stream.mp4",
            quality: "HD"
        });
    }

    // Agregamos streams de addons externos
    const externalStreams = await getExternalStreams(id);
    streams = streams.concat(externalStreams);

    return { streams };
});

// Handler de metadata
builder.defineMetaHandler(async ({ id }) => {
    if (id === "tt1234567") {
        return {
            id,
            type: "movie",
            name: "Ejemplo LumeStream",
            description: "Película de ejemplo del addon LumeStream",
            genres: ["Action", "Adventure"],
            poster: "https://example.com/poster.jpg"
        };
    }
    return null;
});

// Puerto para Render
const PORT = process.env.PORT || 7000;
builder.listen(PORT);
console.log(`LumeStream corriendo en puerto ${PORT}`);
