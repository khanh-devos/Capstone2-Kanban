const URL = 'https://api.tvmaze.com/seasons/1/episodes';
const LENGTH = 6;

export const getMovies = async () => {
  let movies = [];

  await fetch(URL)
    .then(async (res) => {
      movies = await res.json();
    })
    .catch((err) => {
      movies = [];
    });

  return movies.slice(0, LENGTH);
};