export async function getCatalog(type) {
  const catalogs = {
    movie: [
      {
        id: "tt1375666",
        name: "Origen",
        type: "movie",
        description: "Un ladrón que roba secretos a través de los sueños recibe la misión de implantar una idea en la mente de un CEO.",
        year: 2010,
        poster: "https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
        genres: ["Acción", "Ciencia ficción", "Suspense"]
      },
      {
        id: "tt0468569",
        name: "El Caballero Oscuro",
        type: "movie",
        description: "Batman se enfrenta al Joker, un criminal anárquico que busca sembrar el caos en Gotham.",
        year: 2008,
        poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        genres: ["Acción", "Crimen", "Drama"]
      },
      // ...añadir hasta 20 películas
    ],
    series: [
      {
        id: "ser001",
        name: "Stranger Things S01E01",
        type: "series",
        description: "Un grupo de niños descubre fenómenos paranormales y conspiraciones en su pequeña ciudad.",
        year: 2016,
        poster: "https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
        genres: ["Drama", "Ciencia ficción", "Misterio"]
      },
      // ...añadir hasta 20 series
    ],
    documentary: [
      {
        id: "doc001",
        name: "Planeta Tierra II",
        type: "documentary",
        description: "Explora la vida salvaje en distintos hábitats de la Tierra.",
        year: 2016,
        poster: "https://image.tmdb.org/t/p/w500/2uO1t7xCtLd6TTxX69T7s5Jd7gY.jpg",
        genres: ["Naturaleza", "Documental"]
      }
      // ...añadir hasta 10 documentales
    ]
  };
  return catalogs[type] || [];
}
