// server.js
const { addonBuilder } = require("stremio-addon-sdk");

// Define el manifiesto de tu addon
const manifest = {
  id: "org.lumestream.addon",
  version: "1.0.0",
  name: "LumeStream",
  description: "Addon Stremio con guiño a Galicia y cerveza 🍺",
  resources: ["stream", "meta"],
  types: ["movie", "series"],
  idPrefixes: ["tt"], // prefijos IMDB u otros IDs
  catalogs: [
    {
      type: "movie",
      id: "lumestream_movies",
      name: "LumeStream Películas"
    }
  ]
};

// Crea el builder del addon
const builder = new addonBuilder(manifest);

// Ejemplo de handler para streams
builder.defineStreamHandler(async ({ id }) => {
  // Aquí puedes integrar links de otros addons o fuentes
  // Este es un ejemplo estático
  if (id === "tt1234567") {
    return {
      streams: [
        {
          title: "LumeStream Ejemplo",
          url: "https://example.com/stream.mp4",
          quality: "HD",
          infoHash: ""
        }
      ]
    };
  }
  return { streams: [] };
});

// Ejemplo de handler para meta (información de películas/series)
builder.defineMetaHandler(async ({ id }) => {
  if (id === "tt1234567") {
    return {
      id,
      name: "Ejemplo LumeStream",
      type: "movie",
      description: "Película de ejemplo del addon LumeStream",
      genres: ["Action", "Adventure"],
      poster: "https://example.com/poster.jpg"
    };
  }
  return null;
});

// Puerto de Render o por defecto 7000
const PORT = process.env.PORT || 7000;

// Inicia el servidor
builder.listen(PORT);
console.log(`LumeStream addon corriendo en puerto ${PORT}`);
