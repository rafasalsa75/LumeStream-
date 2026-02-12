const { addonBuilder, serveHTTP } = require('stremio-addon-sdk');
const fs = require('fs');

const manifest = require('./manifest.json');
const builder = new addonBuilder(manifest);

// Función genérica para leer catálogo
function readCatalog(file) {
    try {
        return JSON.parse(fs.readFileSync(`./catalogs/${file}`, 'utf8'));
    } catch (err) {
        console.error(err);
        return [];
    }
}

// Manejo de catálogos
builder.defineCatalogHandler((args, cb) => {
    let items = [];
    switch(args.id) {
        case 'movies':
            items = readCatalog('movies.json');
            break;
        case 'series':
            items = readCatalog('series.json');
            break;
        case 'documentaries':
            items = readCatalog('documentaries.json');
            break;
    }
    cb({ metas: items });
});

// Manejo de streams (enlaces a torrents/Peerflix/Torrentio)
builder.defineStreamHandler((args, cb) => {
    const catalogId = args.id.split(':')[0]; // ej. tt12345
    let streams = [];
    switch(catalogId) {
        case 'tt001': // ejemplo película
            streams = [
                {
                    title: "720p Torrent",
                    url: "magnet:?xt=urn:btih:EXAMPLEHASH",
                    infoHash: "EXAMPLEHASH",
                    size: 1500000000,
                    seeders: 120,
                    type: "torrent",
                    available: true
                }
            ];
            break;
        default:
            streams = [];
    }
    cb({ streams });
});

// Servir el addon
serveHTTP(builder);
console.log("LumeStream Addon corriendo en puerto 7000");
