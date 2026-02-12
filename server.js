const { addonBuilder, serveHTTP } = require('stremio-addon-sdk');
const fetch = require('node-fetch');
const PORT = process.env.PORT || 10000;

const TMDB_API_KEY = process.env.TMDB_API_KEY || 'TU_API_KEY_AQUI';
const TMDB_BASE = 'https://api.themoviedb.org/3';

const manifest = {
    id: 'org.metalang.omega.auto',
    version: '2.0.0',
    name: 'MetaLang OMEGA Automático',
    description: 'Addon Stremio con actualización automática de películas y series en castellano',
    logo: 'https://stremio-metalang.onrender.com/images/logo.png',
    resources: ['catalog', 'stream', 'meta'],
    types: ['movie', 'series', 'episode'],
    catalogs: [
        { type: 'movie', id: 'estrenos', name: 'Estrenos' },
        { type: 'movie', id: 'populares', name: 'Populares' },
        { type: 'series', id: 'top_series', name: 'Series Populares' }
    ],
    idPrefixes: ['ml_']
};

const builder = new addonBuilder(manifest);
let catalogCache = {};

async function fetchCatalog(tipo, catalogId) {
    try {
        let url = '';
        if(tipo === 'movie') {
            url = catalogId === 'estrenos' 
                ? `${TMDB_BASE}/movie/now_playing?api_key=${TMDB_API_KEY}&language=es-ES&page=1`
                : `${TMDB_BASE}/movie/popular?api_key=${TMDB_API_KEY}&language=es-ES&page=1`;
        } else if(tipo === 'series') {
            url = `${TMDB_BASE}/tv/popular?api_key=${TMDB_API_KEY}&language=es-ES&page=1`;
        }

        const res = await fetch(url);
        const data = await res.json();
        catalogCache[catalogId] = data.results.map(item => ({
            id: `ml_${tipo}_${item.id}`,
            type: tipo,
            name: item.title || item.name,
            description: item.overview,
            poster: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            releaseInfo: item.release_date || item.first_air_date,
            catalog: catalogId
        }));
    } catch (err) {
        console.error('Error cargando catálogo:', catalogId, err);
        catalogCache[catalogId] = [];
    }
}

async function updateAllCatalogs() {
    await fetchCatalog('movie', 'estrenos');
    await fetchCatalog('movie', 'populares');
    await fetchCatalog('series', 'top_series');
    console.log('🔥 Catálogos actualizados');
}
updateAllCatalogs();
setInterval(updateAllCatalogs, 1000 * 60 * 60);

builder.defineCatalogHandler(async (args) => ({
    metas: catalogCache[args.id] || []
}));

builder.defineStreamHandler(async (args) => ({
    streams: [
        {
            title: args.id + ' - Castellano',
            url: 'magnet:?xt=urn:btih:EXAMPLEHASH1234567890',
            type: 'torrent',
            subtitles: [
                { url: 'https://stremio-metalang.onrender.com/subs/example_es.vtt', lang: 'es', forced: false }
            ]
        }
    ]
}));

builder.defineMetaHandler(async (args) => {
    let item = null;
    Object.values(catalogCache).forEach(cat => {
        const found = cat.find(i => i.id === args.id);
        if(found) item = found;
    });
    return item || { id: args.id, type: 'movie', name: 'No encontrado', description: '' };
});

serveHTTP(builder.getInterface(), { port: PORT });
console.log(`🔥 MetaLang OMEGA Auto-Update listo en puerto ${PORT}`);
