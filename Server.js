const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");

// Manifest interno (usado por el servidor)
const manifest = require("./manifest.json");
const addon = new addonBuilder(manifest);

// Catálogo de ejemplo
addon.defineCatalogHandler(async ({ type, id }) => {
  if (type === "movie") {
    return {
      metas: [
        {
          id: "lumestream_movie_1",
          type: "movie",
          name: "Orixe do Lume",
          description: "Película gallega de ejemplo",
          poster: "https://via.placeholder.com/300x450.png?text=LumeStream"
        },
        {
          id: "lumestream_movie_2",
          type: "movie",
          name: "Lúa Chea",
          description: "Drama gallego",
          poster: "https://via.placeholder.com/300x450.png?text=LumeStream+2"
        }
      ]
    };
  } else if (type === "series") {
    return {
      metas: [
        {
          id: "lumestream_series_1",
          type: "series",
          name: "Fogar de Lumes",
          description: "Serie gallega de ejemplo",
          poster: "https://via.placeholder.com/300x450.png?text=LumeStream+Serie"
        }
      ]
    };
  }
  return { metas: [] };
});

// Streams de ejemplo (YouTube legal, Creative Commons)
addon.defineMetaHandler(async ({ type, id }) => {
  const streams = {
    lumestream_movie_1: [
      {
        title: "Orixe do Lume - YouTube Ejemplo",
        url: "https://www.youtube.com/watch?v=ysz5S6PUM-U", 
        subtitles: []
      }
    ],
    lumestream_movie_2: [
      {
        title: "Lúa Chea - YouTube Ejemplo",
        url: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
        subtitles: []
      }
    ],
    lumestream_series_1: [
      {
        title: "Fogar de Lumes - YouTube Ejemplo",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        subtitles: []
      }
    ]
  };
  return { streams: streams[id] || [] };
});

// Levantar servidor en puerto 7000 (puedes cambiar)
serveHTTP(addon, { port: 7000 });
console.log("LumeStream corriendo en http://localhost:7000");
