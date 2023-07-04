const URL = 'https://api.tvmaze.com/seasons/1/episodes';
export const LIKES_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';
const LENGTH = 6;
export const APP = 'WJMi62Cw2ldmsCpFe58w';

export const getMovies = async () => {
  let movies = [];

  await fetch(URL)
    .then(async (res) => {
      movies = await res.json();
    });

  return movies.slice(0, LENGTH);
};

export const getLikes = async () => {
  let allLikes = [];

  await fetch(`${LIKES_URL}apps/${APP}/likes`)
    .then(async (res) => {
      allLikes = await res.json();
    });

  return allLikes;
};