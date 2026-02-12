const { addonBuilder } = require("stremio-addon-sdk"); // solo addonBuilder
const axios = require("axios");

const manifest = {
    id: "org.lumestream.addon",
    version: "1.0.0",
    name: "LumeStream",
    description: "Addon de películas y series con guiño a Galicia 🍺🔥",
    resources: ["catalog", "stream"],
    types: ["movie", "series"],
    catalogs: [{ type: "movie", id: "lumestream_movies", name: "LumeStream Movies" }],
    idPrefixes: ["tt"]
};

const builder = new addonBuilder(manifest);

builder.defineStreamHandler(async args => ({
    streams: [
        {
            title: "LumeStream HD",
            url: "https://example.com/stream.mp4",
            infoHash: "dummyhash",
            quality: "1080p",
            type: "direct"
        }
    ]
}));

builder.defineCatalogHandler(async args => ({
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
}));

// Aquí reemplazamos serveHTTP
const PORT = process.env.PORT || 7000;
builder.listen(PORT);
console.log(`LumeStream addon corriendo en puerto ${PORT}`);
